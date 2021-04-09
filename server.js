// Externals
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
require("dotenv").config();

// Internals
const routes = require("./src/router/routes");
const PORT = process.env.PORT || 4000;

// Middleware
app
  .use(express.static("static"))
  .use(expressLayouts)
  .set("view engine", "ejs")
  .set("views", "./src/views")
  .set("layout", "./layouts/layout")
  .use(routes);

io.on("connection", (socket) => {
  console.log(`A user connected`);
  socket.on("disconnect", () => {
    console.log(`A user disconnected.`);
  });
  socket.on("message", (message) => {
    console.log(message);
    io.emit("message");
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
