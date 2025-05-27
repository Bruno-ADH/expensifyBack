const mongoose = require("mongoose");

const userSchema = new mongoose.Schema (
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required:true, unique:true },  
        phone: { type: String, required: true },     
        password: { type: String, required:true },
        roleName: { type: String, enum: ["admin", "user"], default: "user", required: true },
        avatar: { type: String, default: "user-image.png" }
    },
    {
        timestamps:true
    }
);
const User = mongoose.model("UserExp", userSchema);
module.exports =  User;