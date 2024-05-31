const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");


const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

const jwt = require("jsonwebtoken");
const moment = require("moment");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Importing TodoDetail model
const Todo = require('./Models/TodoDetails.js');
const User = require('./Models/UserDetails.js');


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

// Posting todos
app.post("/todos/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const { title, category } = req.body;

        const newTodo = new Todo({
            title,
            category,
            dueDate: moment().format("YYYY-MM-DD"),
        });

        await newTodo.save();

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }

        user?.todos.push(newTodo._id);
        await user.save();

        res.status(200).json({ message: "Todo added sucessfully", todo: newTodo });
    } catch (error) {
        res.status(200).json({ message: "Todo not added" });
    }
});

// Getting todos
app.get("/users/:userId/todos", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId).populate("todos");
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        res.status(200).json({ todos: user.todos });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Marking Completing
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

// getting completed todos
app.get("/todos/completed/:date", async (req, res) => {
    try {
        const date = req.params.date;

        const completedTodos = await Todo.find({
            status: "completed",
            createdAt: {
                $gte: new Date(`${date}T00:00:00.000Z`), // Start of the selected date
                $lt: new Date(`${date}T23:59:59.999Z`), // End of the selected date
            },
        }).exec();

        res.status(200).json({ completedTodos });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

// counting no of todos
app.get("/todos/count", async (req, res) => {
    try {
        const totalCompletedTodos = await Todo.countDocuments({
            status: "completed",
        }).exec();

        const totalPendingTodos = await Todo.countDocuments({
            status: "pending",
        }).exec();

        res.status(200).json({ totalCompletedTodos, totalPendingTodos });
    } catch (error) {
        res.status(500).json({ error: "Network error" });
    }
});