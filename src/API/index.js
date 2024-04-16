// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Creating Express app
const app = express();
const port = 3000;

// Enabling CORS
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection setup
const mongoUrl = "mongodb+srv://avanishpratapsingh45:avanish@cluster0.cgavtwr.mongodb.net/";

mongoose
    .connect(mongoUrl)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error in connecting to MongoDB", error);
    });

// Listening to port
app.listen(port, () => {
    console.log("Server is running on port 3000");
});

// Importing User model
require('./Models/UserDetails');
const User = mongoose.model("UserInfo");

// Register endpoint
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Checking if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
    }

    try {
        // Creating new user
        const newUser = new User({
            name,
            email,
            password,
        });

        // Saving new user to database
        await newUser.save();
        res.status(202).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Error registering the user", error);
        res.status(500).json({ message: "Registration failed" });
    }
});

// Generating Secret Key
const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
};
const secretKey = generateSecretKey();

// Login endpoint
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const oldUser = await User.findOne({ email: email });

        if (!oldUser) {
            return res.status(401).json({ message: "Invalid Email" });
        }

        if (oldUser.password !== password) {
            return res.status(401).json({ message: "Invalide password" });
        }

        const token = jwt.sign({ userId: oldUser._id }, secretKey);

        res.status(200).json({ token });
    } catch (error) {
        console.log("Login failed", error);
        res.status(500).json({ message: "Login failed" });
    }
});
