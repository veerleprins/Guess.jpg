// Internals
const formatMessages = require("../utils/messages");
const fetchData = require("../utils/fetching");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("../utils/users");
const fs = require("fs");

const socketIO = async (io) => {
  // Bot name
  const botName = "Chat BOT";
  const file = fs.readFileSync("./static/data/words.json");
  const words = await Array.from(JSON.parse(file));
  let drawer = null;
  let role = null;

  // On socket.io connection
  io.on("connection", (socket) => {
    // When user joins room
    socket.on("join-room", ({ userName, roomID }) => {
      const user = userJoin(socket.id, userName, roomID);
      // Join the room:
      socket.join(user.roomID);

      // To single client
      socket.emit("message", formatMessages(botName, "Welcome to Guess.jpg!"));

      // Broadcast when a user connects to other clients
      socket.broadcast
        .to(user.roomID)
        .emit(
          "message",
          formatMessages(botName, `${user.name} has joined the room.`)
        );
    });

    socket.on("startGame", async () => {
      let thisUser = getCurrentUser(socket.id);
      // Removes start button on all clients
      io.to(thisUser.roomID).emit("removeButton");

      // Sends message to other clients
      socket.broadcast
        .to(thisUser.roomID)
        .emit(
          "message",
          formatMessages(botName, `${thisUser.name} has started the game.`)
        );

      // Getting the room users:
      const roomUsers = getRoomUsers(thisUser.roomID);
      if (!drawer) {
        role = "draw";
        drawer = thisUser.name;
        console.log(thisUser.name + " is going to draw.");

        // Getting the data
        const word = getRandomWord(words);
        const unsplashIMG = await fetchData(
          "search/photos",
          `query=${word}&orientation=landscape`
        );
        console.log(word);
        socket.emit("showResult", unsplashIMG.results[0]);
        drawer = null;
      } else {
        role = "guess";
        console.log(thisUser.name + " is going to guess.");
      }
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

function getRandomWord(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomWord = arr[randomIndex];
  return randomWord;
}

module.exports = socketIO;
