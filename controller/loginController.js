function getLogin(req, res, next) {
  res.render("index", {
    title: "Chat Application",
  });
}

module.exports = {
  getLogin,
};
