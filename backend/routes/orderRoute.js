import express from "express"
import { allOrders, placeOrderCOD, placeOrderStripe, updateStatus, updatePaymentStatus, userOrders } from "../controllers/orderController.js"
import authUser from "../middleware/authMiddleware.js"
import { upload } from '../middleware/multer.js'



const orderRouter = express.Router()

// for Admin
orderRouter.get('/', authUser, allOrders)
orderRouter.post('/status', authUser, updateStatus)
orderRouter.post('/payment-status', authUser, updatePaymentStatus)
// for payment
orderRouter.post('/cod', authUser, upload.single('paymentProof'), placeOrderCOD)
orderRouter.post('/stripe', authUser, placeOrderStripe)
// for user
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter