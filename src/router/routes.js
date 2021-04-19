// Externals
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: true });

// Renders
const home = require("./renders/home");
const room = require("./renders/room");
const enterGameRoom = require("./renders/enterGameRoom");
const error = require("./renders/error");

// Routes
router
  .get("/", home)
  .get("/room/:id", room)
  .get("/*", error)
  .post("/room/:id", urlencodedParser, room)
  .post("/enterRoom", urlencodedParser, enterGameRoom);

module.exports = router;
