const router = require("express").Router();
const { User, Post, Comment } = require("../models");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user || !user.checkPassword(req.body.password)) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.loggedIn = true;
      res.json({ user: user.username, message: "Logged in successfully!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
