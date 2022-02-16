// Importing thing we need
const mongoose = require("mongoose");
// Creating schema
const Schema = mongoose.Schema;
// User schema
const MessageSchema = new Schema({
    senderid: { type: String, required: true },
    reciverid: { type: String, required: true },
    message: { type: String, required: true },
    created: { type: Date, default: Date.now() },
});
//Create a user model
const Message = mongoose.model("message", MessageSchema);
//Exporting Models
module.exports = Message;