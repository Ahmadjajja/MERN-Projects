const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    
})
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;