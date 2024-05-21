const mongoose = require("mongoose");

const TodoDetailSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    detail: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "ToDoInfo"
});


const todoschema = mongoose.model("Todo", TodoDetailSchema);
module.exports = todoschema;