import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js";
import { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

export const productsRouter = Router();

productsRouter.use(authenticateUser);

productsRouter.post("/", upload.single("image"), createProduct);

productsRouter.get("/", getAllProducts);

productsRouter.get("/:id", getSingleProduct);

productsRouter.patch("/:id", upload.single("image"), updateProduct);

productsRouter.delete("/:id", deleteProduct);