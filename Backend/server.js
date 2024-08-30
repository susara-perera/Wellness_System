const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");


// Initialize environment variables
dotenv.config();

// Create Express app
const app = express();


// Port configuration
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connection successful!"))
    .catch((err) => console.error("MongoDB connection error:", err.message));

// Test MongoDB connection
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connected successfully!");
});

// Routes
const authRouter = require("./routes/auth");
const paymentRouter = require("./routes/payment");

// Use routes
app.use("/auth", authRouter);
app.use("/payment", paymentRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
