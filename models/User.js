// Importing thing we need
const mongoose = require("mongoose");
// Creating schema
const Schema = mongoose.Schema;
// User schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    useremail: {
        type: String,
        required: true,
    },
    userpassword: {
        type: String,
        required: true,
    },
    joined: { type: Date, default: Date.now() },
});
//Create a user model
const User = mongoose.model("user", UserSchema);
//Exporting Models
module.exports = User;