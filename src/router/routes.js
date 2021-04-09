// Externals
const express = require("express");
const router = express.Router();
// const bodyParser = require("body-parser");
// const urlencodedParser = bodyParser.urlencoded({ extended: true });

// Renders
const home = require("./renders/home");
const error = require("./renders/error");

// Routes
router.get("/", home).get("/*", error);

module.exports = router;
