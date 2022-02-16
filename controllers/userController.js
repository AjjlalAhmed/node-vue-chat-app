// Controllers Functions

// Importing thing we need
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const errorhandler = require("../helpers/errorHandler");
const validateEmail = require("../helpers/validateEmail ");
// This controller handle signup route
const signup = async(req, res) => {
    // Extracting data from request body
    const username = req.body.username;
    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;
    // Wrapping everything into try & catch block
    try {
        // Checking if credentials is missing
        if (
            username == undefined ||
            useremail == undefined ||
            userpassword == undefined
        ) {
            throw "user credentials is missing";
        }
        // Validating email
        const validEmail = validateEmail(useremail);
        // Checking if email is valid
        if (!validEmail) throw "invalid email";
        // Hashing password
        const hash = await bcrypt.hash(userpassword, 10);
        // Creating new user
        const newUser = new User({
            username: username,
            useremail: useremail,
            userpassword: hash,
        });
        // Checking if user is exist
        User.findOne({ useremail: useremail }, (err, user) => {
            // Wrapping everything into try & catch block
            try {
                // Checking if error
                if (err) throw "internal server error";
                //   Checking if user exist
                if (user) throw "user already exist";
                // Saving user into database
                newUser.save((err, save) => {
                    // Checking if error
                    if (err) throw "internal server error";
                    // Creating Token
                    const token = jwt.sign({ id: save._id },
                        process.env.TOKEN_SECRET, {
                            expiresIn: "1h",
                        }
                    );
                    // Sending response to user
                    res.send({
                        payload: {
                            error: false,
                            message: "new user added",
                            status: 201,
                            user: {
                                username: username,
                                userid: save._id,
                                token: token,
                            },
                        },
                    });
                });
            } catch (e) {
                errorhandler(res, e);
            }
        });
    } catch (e) {
        errorhandler(res, e);
    }
};
// This controller handle login route
const login = async(req, res) => {
    // Extracting data from request body
    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;
    // Wrapping everything into try & catch block
    try {
        // Checking if credentials is missing
        if (useremail == undefined || userpassword == undefined) {
            throw "user credentials is missing";
        }
        // Validating email
        const validEmail = validateEmail(useremail);
        // Checking if email is valid
        if (!validEmail) throw "invalid email";
        // Checking if user is exist
        User.findOne({ useremail: useremail }, async(err, user) => {
            // Wrapping everything into try & catch block
            try {
                // Checking if error
                if (err) throw "internal server error";
                //   Checking if user exist
                if (!user) throw "user does not exist";
                // Comparing user password
                const validPassword = await bcrypt.compare(
                    userpassword,
                    user.userpassword
                );
                // Checking if password is valid
                if (!validPassword) throw "password is not valid";
                // Creating Token
                const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
                    expiresIn: "1h",
                });
                // Sending response to user
                res.send({
                    payload: {
                        error: false,
                        message: "user authenticated",
                        status: 200,
                        user: {
                            username: user.username,
                            userid: user._id,
                            token: token,
                        },
                    },
                });
            } catch (e) {
                console.log(e);
                errorhandler(res, e);
            }
        });
    } catch (e) {
        errorhandler(res, e);
    }
};
// Exporting controller functions
module.exports = {
    signup,
    login,
};