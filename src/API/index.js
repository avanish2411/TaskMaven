// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require('./Models/UserDetails.js');

// Importing TodoDetail model

const Todo = require('./Models/TodoDetails.js')



//adding moment 
const moment = require("moment")

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

app.post("/todos/:oldUserId", async (req, res) => {
    try {
        const userId = req.params.oldUserId;
        const { title, detail } = req.body;
        // Create a new todo with the provided details
        const newTodo = new Todo({
            title,
            detail,
            dueDate: moment().format("YYYY-MM-DD")
        });
        await newTodo.save();
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Add the new todo's ID to the user's todos array
        user?.todos.push(newTodo._id);
        await user.save();
        res.status(200).json({ message: "Todo added successfully", todo: newTodo });
    } catch (error) {
        res.status(500).json({ message: "Todo not added" });
    }
});

app.get("/users/:userId/todos", async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("User ID:", userId);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});



app.patch("/todos/:todoId/complete", async (req, res) => {
    try {
        const todoId = req.params.todoId;

        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            {
                status: "completed",
            },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(200).json({ message: "Todo marked as complete", todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});