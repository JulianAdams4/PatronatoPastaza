/*global process __dirname */
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const apiRoute = require("./routes");


// Load environment variables
require("dotenv").config();

// Passport config
require("./controllers/passport");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/*----------------
    API Routes
----------------*/
app.use("/api", apiRoute);



/*----------------------------
    Create React App Routes
----------------------------*/
const buildPath = "./../frontend/build";
app.use(express.static(path.join(__dirname, buildPath)));

// Return all requests to React app
app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, buildPath, "index.html"));
});
// Protected routes by jwt
app.use("*", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.sendFile(path.join(__dirname, buildPath, "index.html"));
});

app.listen(process.env.SERVER_PORT);
