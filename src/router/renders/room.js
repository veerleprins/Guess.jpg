const room = async (req, res) => {
  try {
    // Render the page:
    res.render("room.ejs", {
      pageTitle: "Room",
      roomID: req.body.gameID,
      userName: req.body.userName,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = room;
