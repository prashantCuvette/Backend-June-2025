import { Products } from "../models/products.model.js";
import { uploadToCloudinary } from "../utils/cloudinaryUtils.js";


export const createProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const file = req.file;

        if (!title || !description || !price || !file) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const imageUrl = await uploadToCloudinary(file.buffer);

        const newProduct = await Products.create({ title, description, price, imageUrl: imageUrl.secure_url });
        return res.status(201).json({
            message: "Product created successfully",
            data: newProduct,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find({});
        return res.status(200).json({
            message: "All products fetched successfully",
            data: products,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({
            message: "Product fetched successfully",
            data: product,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body; // {title, description, price}

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({
                success: false,
                message: "no data provided to update",
            });
        }

        if(req.file){
            const imageUrl = await uploadToCloudinary(req.file.buffer);
            data.imageUrl = imageUrl.secure_url; // {title, description, price, imageUrl}
        }

        const updatedProduct = await Products.findById(id);
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedData = Object.assign(updatedProduct, data);
        await updatedData.save();

        return res.status(200).json({
            message: "Product updated successfully",
            data: updatedData,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Products.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({
            message: "Product deleted successfully",
            data: deletedProduct,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};