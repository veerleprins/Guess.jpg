// Connection to sockets
const socket = io.connect(window.location.origin);

// Get the elements of the DOM
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const userName = document.getElementById("userName").name;
const roomID = document.querySelector(".roomID").innerText;
const startGame = document.querySelector(".start");
const outputDiv = document.querySelector(".output");
const section = document.querySelector("section");
const span = document.querySelector(".roomID");
const buttonContainer = document.querySelector(".button-container");
const send = document.getElementById("sendText");
const scoreSpan = document.querySelector(".score");

// Internals
let drawing = false;
let canvas = null;
let ctx = null;
let pos = {
  x: 0,
  y: 0,
};
const userObj = {
  userName: userName,
  roomID: roomID,
  userRole: "",
};

// Sending user info to server
socket.emit("join-room", { userName: userName, roomID: roomID, userRole: "" });

// Adding event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    // From specific client to server
    let text = input.value;
    socket.emit("chatMessage", {
      userName: userName,
      role: "",
      text,
    });
    input.value = "";
    input.focus();
  }
});

//  STARTING THE GAME:
startGame.addEventListener("click", (e) => {
  // Send to server:
  socket.emit("startGame", userName);
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

socket.on("setupGame", () => {
  // Removes button & adds canvas
  canvas = createElement("canvas");
  ctx = canvas.getContext("2d");
  startGame.parentNode.removeChild(startGame);
  buttonContainer.remove();
  section.appendChild(canvas);
  resize();
  window.addEventListener("resize", resize);
});

socket.on("showResult", async (data) => {
  if (data.role !== "drawer") return;

  console.log(`You need to draw: ${data.word}`);
  addIMG(data.data);
  canvas.addEventListener("mousedown", () => (drawing = true));
  canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
  });
  canvas.addEventListener("mousemove", (event) => {
    if (!drawing) return;
    reposition(event);
    draw(pos);
    socket.emit("draw", pos);
  });
});

socket.on("draw", (position) => {
  ctx = canvas.getContext("2d");
  draw(position);
});

socket.on("updatePoints", (score) => {
  console.log(typeof score);
  console.log(score);
  if (score < 5) {
    num = score.toString();
    scoreSpan.textContent = num;
  }
});

socket.on("messageIMG", (object) => {
  let li = createElement("li");
  let img = createElement("img", "guessedIMG");
  let name = createElement("p", "name");
  let text = createElement("p", "text");
  text.textContent = object.info.text;
  // name.textContent = `${object.info.username} - ${object.info.time}`
  img.setAttribute("src", object.photoURL);
  if (object.info.username === "Chat BOT") {
    li.classList.add("bot-chats");
  }
  // li.appendChild(name);
  li.appendChild(text);
  li.appendChild(img);
  messages.appendChild(li);
});

socket.on("removeSetup", () => {
  let lastIMG = document.querySelector(".unsplashPhoto");
  if (lastIMG) {
    lastIMG.remove();
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx = null;
  ctx = canvas.getContext("2d");
});

socket.on("newDrawer", () => {
  socket.emit("newRound");
});

// All the functions
function addIMG(photo) {
  let figure = createElement("figure", "unsplashPhoto");
  let figCap = createElement("figcaption", "caption");
  let link = createElement("a");
  link.href = photo.user.links.html;
  link.textContent = photo.user.name;
  // let button = createElement("button", "clear");
  let img = createElement("img");
  figCap.innerHTML = `Photo by ${link.outerHTML} on Unsplash.`;
  // button.textContent = `Clear`;
  // section.appendChild(button);
  img.setAttribute("src", photo.urls.small);
  img.setAttribute("alt", photo.alt_description);
  figure.appendChild(img);
  figure.appendChild(figCap);
  outputDiv.appendChild(figure);
}

function reposition(event) {
  pos.x = event.clientX - canvas.getBoundingClientRect().left;
  pos.y = event.clientY - canvas.getBoundingClientRect().top;
}

function resize() {
  canvas.height = 400;
  canvas.width = (window.innerWidth / 100) * 62;
  // setCanvas();
}

function setCanvas() {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0c4934";
  ctx.fill();
}

function draw(position) {
  ctx.beginPath();
  ctx.strokeStyle = "#0c4934";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.lineTo(position.x, position.y);
  ctx.moveTo(position.x, position.y);
  ctx.stroke();
}

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
  } else if (msg.username === "Chat BOT") {
    li.classList.add("bot-chats");
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
