import transporter from "../config/nodemailer.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import stripe from "stripe";
import { v2 as cloudinary } from 'cloudinary'

// Global variables for payment
const currency = "lkr";
const delivery_charges = 0; // shipping removed
const MINIMUM_ORDER_AMOUNT = 180; // Stripe requires ~LKR 180 minimum (~$0.50)

// Place Order using BT [POST '/cod']
export const placeOrderCOD = async (req, res) => {
    try {
        let { items, address } = req.body;
        // If request is multipart/form-data, items may be a JSON string
        if (typeof items === 'string') {
            try { items = JSON.parse(items) } catch (e) { }
        }
        // req.file is available when a payment proof image is uploaded (multer memoryStorage)
        const file = req.file;

        // For bank transfer (BT) require a payment proof image
        if (!file) {
            return res.json({ success: false, message: 'Please upload payment proof for bank transfer.' })
        }
        const { userId } = req.auth();

        if (!items || items.length === 0) {
            return res.json({ success: false, message: "Please add a product first." });
        }

        // Calculate subtotal
        let subtotal = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) return res.json({ success: false, message: "Product not found." });

            const unitPrice = product.price[item.size];
            if (!unitPrice) return res.json({ success: false, message: "Invalid size selected." });

            subtotal += unitPrice * item.quantity;
        }

        const totalAmount = subtotal;

        // Prepare paymentProof if file provided
        let paymentProof = undefined
        if (file) {
            // upload buffer to cloudinary using upload_stream
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'payment_proofs' }, (error, result) => {
                    if (error) return reject(error)
                    resolve(result)
                })
                stream.end(file.buffer)
            })
            paymentProof = { url: uploadResult.secure_url, public_id: uploadResult.public_id }
        }

        // Create order
        const order = await Order.create({
            userId,
            items,
            amount: totalAmount,
            address,
            paymentMethod: "BT",
            paymentProof,
        });

        // Clear cart
        await User.findByIdAndUpdate(userId, { cartData: {} });

        // Send confirmation email
        const populatedOrder = await Order.findById(order._id).populate("items.product address");
        const user = await User.findById(userId);

        const productTitles = populatedOrder.items
            .map((item) => item.product?.title || "Unknown")
            .join(", ");
        const addressString = populatedOrder.address
            ? `${populatedOrder.address.street || "N/A"}, ${populatedOrder.address.city || "N/A"}`
            : "No address";

        const mailOptions = {
            from: process.env.SMTP_SENDER_EMAIL,
            to: user.email,
            subject: "Order Details (BT)",
            html: `
                <h2>Your Delivery Details</h2>
                <p>Thank you for your order! <br>Below are your order details:</p>
                <ul>
                    <li><strong>Order ID:</strong> ${populatedOrder._id}</li>
                    <li><strong>Products:</strong> ${productTitles}</li>
                    <li><strong>Address:</strong> ${addressString}</li>
                    <li><strong>Total Amount:</strong> Rs ${populatedOrder.amount}</li>
                </ul>
                <p>You’ll receive your delivery in 1 day. 😊 <br>Please note that the delivery fee can be paid when the item arrives. Thank you!</p>
                <p>ඔබගේ බෙදාහැරීම එක දිනකින් ලැබෙයි. <br>නිෂ්පාදනය ලැබෙන විට බෙදාහැරීමේ ගාස්තුව ගෙවිය හැකි බව කරුණාවෙන් දැනුවත් වෙන්න.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "Order placed successfully (BT)." });
    } catch (error) {
        console.error("BT Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

// Place Order using Stripe [POST '/stripe']
export const placeOrderStripe = async (req, res) => {
    try {
        const { items, address } = req.body;
        const { userId } = req.auth();
        const { origin } = req.headers;

        if (!items || items.length === 0) {
            return res.json({ success: false, message: "Please add a product first." });
        }

        let subtotal = 0;
        let productData = [];

        // Calculate subtotal and prepare product data
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) return res.json({ success: false, message: "Product not found." });

            const unitPrice = product.price[item.size];
            if (!unitPrice) return res.json({ success: false, message: "Invalid size selected." });

            subtotal += unitPrice * item.quantity;

            productData.push({
                name: product.title,
                price: unitPrice,
                quantity: item.quantity,
            });
        }

        const totalAmount = subtotal;

        // Stripe minimum amount check (LKR 180)
        if (totalAmount < MINIMUM_ORDER_AMOUNT) {
            return res.json({
                success: false,
                message: `Stripe requires a minimum order total of LKR ${MINIMUM_ORDER_AMOUNT}. Please add more items to your cart.`,
            });
        }

        // Create order in DB
        const order = await Order.create({
            userId,
            items,
            amount: totalAmount,
            address,
            paymentMethod: "stripe",
        });

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        // Prepare line items for Stripe Checkout
        let line_items = productData.map((item) => ({
            price_data: {
                currency,
                product_data: { name: item.name },
                unit_amount: Math.round(item.price * 100), // LKR in cents
            },
            quantity: item.quantity,
        }));

        // delivery charges removed

        // Create Stripe Checkout Session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/processing/my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            },
        });

        return res.json({ success: true, url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

// Get all user orders [POST '/userorders']
export const userOrders = async (req, res) => {
    try {
        const { userId } = req.auth();
        const orders = await Order.find({
            userId,
            $or: [{ paymentMethod: "BT" }, { isPaid: true }],
        })
            .populate("items.product address")
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        console.error("User Orders Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

// Get all orders for admin [POST '/']
export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentMethod: "BT" }, { isPaid: true }],
        })
            .populate("items.product address")
            .sort({ createdAt: -1 });

        const totalOrders = orders.length;
        const totalRevenue = orders.reduce(
            (acc, o) => acc + (o.isPaid ? o.amount : 0),
            0
        );

        res.json({ success: true, dashboardData: { totalOrders, totalRevenue, orders } });
    } catch (error) {
        console.error("Admin Orders Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

// order status for admin [POST '/status']
export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { status });

        res.json({ success: true, message: "Order status updated successfully." });
    } catch (error) {
        console.error("Update Status Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

// Update payment status for admin [POST '/payment-status']
export const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId, isPaid } = req.body;
        await Order.findByIdAndUpdate(orderId, { isPaid });

        res.json({ success: true, message: `Payment status updated to ${isPaid ? 'Paid' : 'Unpaid'}.` });
    } catch (error) {
        console.error("Update Payment Status Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};
