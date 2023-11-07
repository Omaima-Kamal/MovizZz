// INITIALIZE EXPRESS APP
const express = require("express");
const app = express();

// GLOBAL MIDDLEWARE
app.use(express.json()) // when we send data from postman in json it can understand it
app.use(express.urlencoded({extended: true })); // to access url from encoded
app.use(express.static('upload'));
const cors = require("cors");
app.use(cors()); // allow http requests local hosts

// REQUIRED MODULES
const auth = require("./routes/Auth");
const movies = require("./routes/Movies");

// RUN THE APP
app.listen(4000,"localhost",() => {
    console.log("SERVER IS RUNNING");
})

// API ROUTES [ENDPOINTS]
app.use("/auth",auth);
app.use("/movies",movies);
