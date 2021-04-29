// Externals
const emoji = require("node-emoji");

// Internals
const fs = require("fs");
const formatMessages = require("../utils/messages");
const fetchData = require("../utils/fetching");
const {
  userJoin,
  getCurrentUser,
  getRoomUsers,
  getAllUsers,
  userLeave,
} = require("../utils/users");

const socketIO = async (io) => {
  // Bot name
  const botName = "Chat BOT";
  const wordsFile = fs.readFileSync("./static/data/words.json");
  const words = await Array.from(JSON.parse(wordsFile));
  let photoURL;
  let roomConnections = 0;
  let word;
  let gameMode = {
    active: false,
    round: 0,
  };

  // On socket.io connection
  io.on("connection", (socket) => {
    console.log("New Socket Connection.");

    socket.on("join-room", async (obj) => {
      // Socket connection joins room
      socket.join(obj.roomID);
      roomConnections++;
      console.log(roomConnections);

      // To this client/socket
      socket.emit(
        "message",
        formatMessages(botName, `Welcome to Guess.jpg! ${emoji.get("tada")}`)
      );

      // Push new user to 'database'
      let user = userJoin(socket.id, obj.userName, obj.roomID);

      // To other clients when socket connection joins room
      socket.broadcast
        .to(user.roomID)
        .emit(
          "message",
          formatMessages(botName, `${user.name} has joined the room.`)
        );

      // Check if there is a drawer
      let allUsers = getRoomUsers(user.roomID);
      let userRoles = allUsers.map((u) => u.role);
      if (!userRoles.includes("drawer")) {
        user.role = "drawer";
        console.log(`${user.name} is de drawer.`);
      } else {
        user.role = "guesser";
        console.log(`${user.name} is een guesser.`);
      }

      // io.in(obj.roomID).emit("user-connected", user);
    });

    socket.on("startGame", async (user) => {
      // Getting this socket object from 'database'
      let thisUser = getCurrentUser(socket.id);
      console.log(roomConnections);
      if (roomConnections < 2) {
        socket.emit(
          "message",
          formatMessages(
            botName,
            `You need at least 2 players ${emoji.get("disappointed")}!`
          )
        );
        return;
      }

      // Get room users
      let theUsersOfTheRoom = getAllUsers();
      theUsersOfTheRoom.forEach((u) => {
        console.log(u);
      });
      gameMode.active = true;
      gameMode.round++;

      // Sends message to other clients/sockets
      socket.broadcast
        .to(thisUser.roomID)
        .emit(
          "message",
          formatMessages(botName, `${thisUser.name} has started the game.`)
        );

      // Setting up the game page
      io.to(thisUser.roomID).emit("setupGame");

      // Getting the data
      word = getRandomWord(words);
      const unsplashData = await fetchData(
        "search/photos",
        `query=${word}&orientation=landscape`
      );
      photoURL = await unsplashData.results[0].urls.small;

      // Check who is the drawer:
      if (thisUser.role === "drawer") {
        // Sends message to other clients
        socket.broadcast
          .to(thisUser.roomID)
          .emit(
            "message",
            formatMessages(
              botName,
              `${thisUser.name} is the drawer & you are the guesser.`
            )
          );
      }

      // Going to play the game
      let roomusers = getRoomUsers(thisUser.roomID);
      let currentDrawer = roomusers.find((u) => u.role === "drawer");
      console.log("current drawer: " + JSON.stringify(currentDrawer, null, 4));

      io.to(currentDrawer.id).emit("showResult", {
        role: currentDrawer.role,
        data: unsplashData.results[0],
        word,
      });
    });

    socket.on("draw", (position) => {
      let thisUser = getCurrentUser(socket.id);
      socket.broadcast.to(thisUser.roomID).emit("draw", position);
    });

    socket.on("newRound", async () => {
      console.log("New Round has started...");
      gameMode.active = true;
      gameMode.round++;
      // Getting this specific user
      let thisUser = getCurrentUser(socket.id);

      // Getting the data
      word = getRandomWord(words);
      const unsplashData = await fetchData(
        "search/photos",
        `query=${word}&orientation=landscape`
      );
      photoURL = await unsplashData.results[0].urls.small;

      // Check who is the drawer:
      if (thisUser.role === "drawer") {
        // Sends message to other clients
        socket.broadcast
          .to(thisUser.roomID)
          .emit(
            "message",
            formatMessages(
              botName,
              `${thisUser.name} is the drawer & you are the guesser.`
            )
          );
      }

      // Send to specific user
      io.to(thisUser.id).emit("showResult", {
        role: thisUser.role,
        data: unsplashData.results[0],
        word,
      });
    });

    // Listens for messages
    socket.on("chatMessage", (msg) => {
      let thisUser = getCurrentUser(socket.id);
      console.log("users role: " + thisUser.role);

      if (gameMode.active) {
        if (thisUser.role === "guesser") {
          // Text message for guesser
          if (
            msg.text.toLowerCase().includes(word) ||
            msg.text.toLowerCase() === word
          ) {
            console.log("woord is gelijk");
            io.to(thisUser.roomID).emit(
              "message",
              formatMessages(thisUser.name, msg.text)
            );

            gameMode.active = false;
            thisUser.score++;
            // Sent to other clients who gets a point
            socket.broadcast
              .to(thisUser.roomID)
              .emit(
                "message",
                formatMessages(
                  botName,
                  `The correct word is ${word}, ${msg.userName} gets a point!`
                )
              );

            // Sent to this socket that earns a point
            socket.emit(
              "message",
              formatMessages(
                botName,
                `The correct word is ${word}, you get a point!`
              )
            );

            io.to(thisUser.roomID).emit("messageIMG", {
              info: formatMessages(botName, `This was the image:`),
              photoURL,
            });
            socket.emit("updatePoints", thisUser.score);

            // STARTING NEW ROUND
            if (thisUser.score < 5) {
              // Get all users
              let allUsers = getRoomUsers(thisUser.roomID);
              console.log("All the users:" + JSON.stringify(allUsers, null, 4));

              // Change roles
              thisUser.role = "drawer";
              allUsers.forEach((u) => {
                if (u.id !== thisUser.id) {
                  u.role = "guesser";
                  // u["role"] = "guesser";
                }
              });

              let newUsers = getRoomUsers(thisUser.roomID);
              console.log(
                "All the users AFTER: " + JSON.stringify(newUsers, null, 4)
              );

              // Removes old setup
              io.to(thisUser.roomID).emit("removeSetup");

              // Create the new drawer setup
              socket.emit("newDrawer");
            }
          } else {
            // Game logic when points are above 5
            io.to(thisUser.roomID).emit(
              "message",
              formatMessages(thisUser.name, msg.text)
            );
          }
        } else {
          console.log(word);
          // Text message for drawer
          if (!msg.text.includes(word)) {
            io.to(thisUser.roomID).emit(
              "message",
              formatMessages(thisUser.name, msg.text)
            );
          }
        }
      } else {
        io.to(thisUser.roomID).emit(
          "message",
          formatMessages(thisUser.name, msg.text)
        );
      }
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
      console.log("Socket connection leaves");
      roomConnections--;
      if (roomConnections === -1) {
        roomConnections = 0;
      }
      console.log(roomConnections);
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
