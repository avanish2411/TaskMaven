const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    //place where all details of user are located
    collection: "UserInfo"
});

mongoose.model("UserInfo", UserDetailSchema);