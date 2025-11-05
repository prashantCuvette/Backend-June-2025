import { User } from "../models/users.model.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res) => {
    try {
        let getUsers = [];
        getUsers = await User.find({});

        return res
            .status(200)
            .json({
                success: true,
                message: "all users",
                data: getUsers
            });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "failed to fetch all users"
        });

    }
};

export const createNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "all fields are required",
                });
        }

        const findExistingUser = await User.findOne({ email });
        if (findExistingUser) {
            return res
                .status(409)
                .json({
                    success: false,
                    message: "user alreday exists",
                });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
        });

        return res
            .status(201)
            .json({
                message: "user created successfully",
                status: true,
                user: newUser,
            })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "failed to create user",
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "all fields are required",
                });
        }

        const findExistingUser = await User.findOne({ email });
        if (!findExistingUser) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "user with email not found",
                });
        }

        const verifyPassword = await bcrypt.compare(password, findExistingUser.password);
        if (!verifyPassword) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "wrong password",
                });
        }

        return res.status(200).json({
            success: true,
            message: "login successful",
            data: findExistingUser,
        });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "failed to login",
        });
    }
};

export const updateUser = () => { };

export const deleteUser = () => { };