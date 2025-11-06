import { User } from "../models/users.model.js";
import bcrypt from "bcryptjs";
import express from "express"
import { generateToken } from "../utils/generateToken.js";

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

        const accessToken = generateToken(newUser._id);

        res.cookie("accessToken", accessToken, {
            httpOnly: true, // this does not allow JS to access cookies
            maxAge: 1000 * 60 * 60 * 24, // in miliseconds
            secure: false, // trueif using HTTPS
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

        const accessToken = generateToken(findExistingUser._id);

        res.cookie("accessToken", accessToken, {
            httpOnly: true, // this does not allow JS to access cookies
            maxAge: 1000 * 60 * 60 * 24, // in miliseconds
            secure: false, // trueif using HTTPS
        });

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

export const updateUser = async (req, res) => {
    const { id } = req.user;

    const findUser = await User.findById(id);
    if (!findUser) {
        res.status(404).json({
            success: false,
            message: "user not found"
        })
    }

    

};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.user;

        const findUser = await User.findById(id);
        if (!findUser) {
            res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        res.clearCookie("accessToken", {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            secure: false,
        });

        await User.deleteOne({ _id: id });
        res.status(200).json({
            success: true,
            message: "user deleted successfully"
        });
    } catch (error) {

    }
};