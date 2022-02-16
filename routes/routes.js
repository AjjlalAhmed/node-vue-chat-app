// Importing thing we need
const express = require("express");
const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");
// Creating router
const router = express.Router();
// Routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/send", messageController.send);
// Exporting routes
module.exports = router;