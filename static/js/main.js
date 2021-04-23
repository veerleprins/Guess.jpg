// Connection to sockets
const socket = io.connect(window.location.origin);

// Get the elements of the DOM
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const userName = document.getElementById("userName").name;
const roomID = document.getElementById("roomID").name;
const startGame = document.querySelector(".start");
const outputDiv = document.querySelector(".output");
const section = document.querySelector("section");
const span = document.querySelector(".roomID");

// Sending user info to server
socket.emit("join-room", { userName, roomID });

// Adding event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    // From specific client to server
    const text = input.value;
    socket.emit("chatMessage", { userName, text });
    input.value = "";
    input.focus();
  }
});

startGame.addEventListener("click", (e) => {
  console.log("Spel begint...");
  socket.emit("startGame");
});

// To copy Game ID
span.addEventListener("click", () => {
  document.execCommand("copy");
});

span.addEventListener("copy", (event) => {
  event.preventDefault();
  if (event.clipboardData) {
    event.clipboardData.setData("text/plain", span.textContent);
    console.log(event.clipboardData.getData("text"));
  }
});

// Output message to DOM
socket.on("message", (message) => {
  outputMessage(message);
  // Scroll down
  messages.scrollTop = messages.scrollHeight;
});

socket.on("removeButton", () => {
  startGame.parentNode.removeChild(startGame);
  let canvas = createElement("canvas");
  section.appendChild(canvas);
});

socket.on("user-connected", (user) => {
  let item = document.createElement("li");
  item.textContent = `${user.username} ${user.text}`;
  messages.appendChild(item);
});

socket.on("showResult", (photo) => {
  let figure = createElement("figure", "unsplashPhoto");
  let button = createElement("button", "clear");
  let img = createElement("img");
  button.textContent = `Clear`;
  outputDiv.appendChild(figure);
  section.appendChild(button);
  img.setAttribute("src", photo.urls.small);
  figure.appendChild(img);
});

// All the functions
function outputMessage(msg) {
  let li = createElement("li");
  let name = createElement("p", "name");
  let text = createElement("p", "text");

  text.textContent = `${msg.text}`;
  if (msg.username === userName) {
    name.textContent = `You - ${msg.time}`;
  } else {
    name.textContent = `${msg.username} - ${msg.time}`;
  }
  li.appendChild(name);
  li.appendChild(text);
  if (msg.username === userName) {
    li.classList.add("own-chats");
  }
  messages.appendChild(li);
}

function createElement(el, className) {
  let item = document.createElement(el);
  if (className) {
    item.classList.add(className);
  }
  return item;
}
