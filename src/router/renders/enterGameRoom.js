const enterGameRoom = (req, res) => {
  try {
    res.render("room.ejs", {
      pageTitle: "Room",
      roomID: req.body.gameID,
      userName: req.body.userName,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = enterGameRoom;
