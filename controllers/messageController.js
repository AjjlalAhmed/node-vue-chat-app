// Controllers Functions

// Importing thing we need
const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
const errorhandler = require("../helpers/errorHandler");

const send = async(req, res) => {
    // Extracting data from request body
    const reciverid = req.body.reciverid;
    const message = req.body.message;
    const token = req.body.token;
    // Wrapping everything into try & catch block
    try {
        // Checking if credentials is missing
        if (reciverid == undefined || message == undefined || token == undefined) {
            throw "user credentials is missing";
        }
        // Verify user token
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            // Checking if error
            if (err) throw "invalid token";
            //   Checking if token undefined
            if (user == undefined) throw "invalid token";
            console.log(user);
            // Creating new message
            const newMesssge = new Message({
                senderid: user.id,
                reciverid: reciverid,
                message: message,
            });
            // Saving new message
            newMesssge.save((err, save) => {
                // Checking if error
                if (err) throw "internal server error";
                // Sending response to user
                res.send({
                    payload: {
                        error: false,
                        message: "new message added",
                        status: 201,
                    },
                });
            });
        });
    } catch (e) {
        errorhandler(res, e);
    }
};

// Exporting controller functions
module.exports = {
    send,
};