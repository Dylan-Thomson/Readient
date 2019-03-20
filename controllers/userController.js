const db = require("../models");
const passport = require("../passport");

module.exports = {
  createUser: (req, res) => {
    const { email, username, password } = req.body;
    db.User.findOne({username: username, email: email}, (err, user) => {
      if (err) {
        console.log("User.js POST ERROR: ", err);
      }
      else if (user) {
        res.json({
          error: "A user already exists with that username/email"
        });
      }
      else {
        const newUser = new db.User({
          email: email,
          username: username,
          password: password
        });
        newUser.save((err, savedUser) => {
          if (err) return res.json(err);
          res.json(savedUser);
        });
      }
    });
  },

  attemptLogin: (req, res, next) => {
    console.log("Login user:");
    console.log(req.body);
    next();
  },

  completeLogin: (req, res) => {
    console.log("Logged in", req.user);
    res.send(req.user.username);
  },

  getCurrentUser: (req, res, next) => {
    console.log("USER: ");
    console.log(req.user);
    if (req.user) {
      res.json({ user: req.user });
    }
    else {
      res.json({ user: null });
    }
  },

  logout: (req, res) => {
    if (req.user) {
      req.logout();
      res.send({ msg: "Logging out" });
    }
    else {
      res.send({ msg: "No user to log out" });
    }
  }
}
