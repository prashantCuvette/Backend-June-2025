import { Router } from "express";
import { createNewUser, deleteUser, getAllUser, loginUser, updateUser } from "../controllers/users.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

export const usersRouter = Router();


usersRouter.get("/", getAllUser);

usersRouter.post("/", createNewUser);

usersRouter.post("/login", loginUser);

usersRouter.patch("/:id", authenticateUser, updateUser);

usersRouter.delete("/:id", authenticateUser, deleteUser);




