const home = (req, res) => {
  try {
    // Render the page:
    res.render("index.ejs", {
      pageTitle: "Home",
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = home;
