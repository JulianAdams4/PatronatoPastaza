/*global __dirname */
const express = require("express");
const apiRoute = require("./routes");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

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
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, buildPath, "index.html"));
});

app.listen("5000");
