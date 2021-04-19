// Internals
const formatMessages = require("../utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("../utils/users");

const socketIO = (io) => {
  // Bot name
  const botName = "Chat BOT";

  // On socket.io connection
  io.on("connection", (socket) => {
    // When user joins room
    socket.on("join-room", ({ userName, roomID }) => {
      const user = userJoin(socket.id, userName, roomID);

      socket.join(user.roomID);
      // To single client
      socket.emit("message", formatMessages(botName, "Welcome to Guess.jpg!"));

      // Broadcast when a user connects to all other clients
      socket.broadcast
        .to(user.roomID)
        .emit(
          "message",
          formatMessages(botName, `${user.name} has joined the room.`)
        );
    });

    // Listen for messages
    socket.on("chatMessage", (msg) => {
      let thisUser = getCurrentUser(socket.id);
      // To all clients
      io.to(thisUser.roomID).emit(
        "message",
        formatMessages(thisUser.name, msg.text)
      );
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
      let thisUser = userLeave(socket.id);

      if (thisUser) {
        // To all clients
        io.to(thisUser.roomID).emit(
          "message",
          formatMessages(botName, `${thisUser.name} has left the chat.`)
        );
      }
    });
  });
};

module.exports = socketIO;
