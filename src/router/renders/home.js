// Externals
const key = require("uniqid");

const home = (req, res) => {
  try {
    // Render the page:
    res.render("index.ejs", {
      pageTitle: "Home",
      newKey: key(),
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = home;
