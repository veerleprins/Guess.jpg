let users = [];

// Join user to chat
function userJoin(ID, userName, room) {
  let user = {
    id: ID,
    name: userName,
    roomID: room,
    score: 0,
    role: null,
  };
  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get Room users
function getRoomUsers(room) {
  let roomUsers = users.filter((user) => user.roomID === room);
  return roomUsers;
}

// All users
function getAllUsers() {
  return users;
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getAllUsers,
};
