// Importing thing we need
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
// Creating app
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/", require("./routes/routes"));
// Creating Port
const PORT = process.env.PORT || 3000;
// Trying to database
mongoose.connect(process.env.DBURI, (err) => {
    // Wrapping everything into try & catch block
    try {
        // Checking if error
        if (err) throw err;
        // Listening to server
        app.listen(PORT, () => {
            console.log(`Server is running on Port ${PORT}`);
        });
    } catch (e) {
        console.log(e.message);
    }
});