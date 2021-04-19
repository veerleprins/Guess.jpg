const enterGameRoom = (req, res) => {
  try {
    console.log("Form submission:", req.body);
    res.render("room.ejs", {
      pageTitle: "Room",
      roomID: req.body.gameID,
      userName: req.body.userName,
    });
    // res.redirect(`/room/${req.body.gameID}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = enterGameRoom;
