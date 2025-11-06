import express from "express";
import { envVariables } from "./configs/envVariables.js";
import { connectDB } from "./configs/connectDB.js";
import cookieParser from "cookie-parser";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

// check route to see if the server is running
app.get("/", (req, res) => {
    res.send("Hello World");
});

import { usersRouter } from "./routes/users.route.js";
app.use("/api/v1/users", usersRouter);


app.listen(envVariables.port, () => {
    console.log(`Server is running on port ${envVariables.port}`);
});

// config: setup server, connect to database, etc.
// controllers: actual business logic
// routes: define the endpoints and their handlers
// models: define the data models
// utils: utility functions
// middlewares: middleware functions
// app.js: entry point of the application
// package.json: configuration file for the project
// .env: environment variables