import { Router } from "express";
import { createNewUser, deleteUser, getAllUser, loginUser, logoutUser, updateUser } from "../controllers/users.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

export const usersRouter = Router();


usersRouter.get("/", getAllUser);

usersRouter.post("/", createNewUser);

usersRouter.post("/login", loginUser);

usersRouter.get("/logout", authenticateUser, logoutUser);

usersRouter.patch("/", authenticateUser, updateUser);

usersRouter.delete("/", authenticateUser, deleteUser);




