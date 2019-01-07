/*global process __dirname */
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
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

const noCache = (req, res, next) => {
  res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
  res.header("Expires", "Fri, 31 Dec 1998 12:00:00 GMT");
  next();
};

// Return all requests to React app
app.get("/", noCache, (req, res) => {
  return res.sendFile(path.join(__dirname, buildPath, "index.html"));
});
// Protected routes by jwt
app.use("*", noCache, (req, res) => {
  return res.sendFile(path.join(__dirname, buildPath, "index.html"));
});


app.listen(process.env.SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log("Server listen on port: ", process.env.SERVER_PORT);
});
