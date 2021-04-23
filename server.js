// Externals
const path = require("path");
const express = require("express");
const layoutEJS = require("express-ejs-layouts");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
require("dotenv").config();

// Internals
const routes = require("./src/router/routes");
const socketIO = require("./src/web/initSocket");
const PORT = process.env.PORT || 4000;

// Middleware
app
  .use(express.static(path.join(__dirname, "static")))
  .use(layoutEJS)
  .set("view engine", "ejs")
  .set("views", "./src/views")
  .set("layout", "./layouts/layout")
  .use(routes)
  .use((req, res, next) => {
    if (process.env.NODE_ENV != "development" && !req.secure) {
      return res.redirect("https://" + req.headers.host + req.url);
    }
    next();
  });

// Socket
socketIO(io);

// Server
server.listen(PORT, () => {
  console.log(`Server is listening on port https://localhost:${PORT}`);
});
