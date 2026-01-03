import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"

//controller function for adding Product [POST '/']
export const createProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData)
        const images = req.files

        if (!images || images.length === 0) {
            return res.json({ success: false, message: "Missing required parameter - file" })
        }

        //upload images to cloudinary using upload_stream for memory buffers
        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
                        if (error) return reject(error)
                        resolve(result.secure_url)
                    })
                    stream.end(item.buffer)
                })
            })
        )

        await Product.create({ ...productData, images: imagesUrl })

        res.json({ success: true, message: "Product Added" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


//contraller function for get product list [GET '/']
export const listProduct = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({success:true, products})
        
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


//contraller function for get single product list [GET '/single']
export const singleProduct = async (req, res) => {
    try {
        const {productId} = await req.body
        const product = await Product.findById(productId)
        res.json({success:true, product})
        
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


//contraller function for toggle stock [GET '/toggle-stock']
export const toggleStock = async (req, res) => {
    try {
        const {productId, inStock} = req.body
        await Product.findByIdAndUpdate(productId, {inStock})
        res.json({success:true, message: "Stock Updated"})

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

