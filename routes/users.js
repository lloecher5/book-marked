var express = require("express");
var router = express.Router();
//import all of the models in the models folder
const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* POST/api/v1/users/register listing. */
router.post("/register", function (req, res, next) {
  //checks to make sure that there are no missing fields
  if (!req.body.email || !req.body.password) {
    //send back an erro if there is a missing email or password
    res.status(400).json({ error: "please include all required fields." });
    return;
  }

  //check if email is in use
  models.User.findAll({ where: { email: req.body.email } }).then((users) => {
    //if there is already a user in the DB, and an error and return
    if (users.length > 0) {
      res.status(400).json({ error: "email already in use" });
      return;
    }

    //if not, hash the password and then create a new user

    bcrypt.hash(req.body.password, 10).then((hash) => {
      //store the new user in the DB
      models.User.create({
        email: req.body.email,
        password: hash,
      }).then((user) => {
        //send back a response to the user
        res.status(201).json(user);
      });
    });

    //send back new user
  });
});

router.post("/login", (req, res) => {
  //checks to make sure that there are no missing fields
  if (!req.body.email || !req.body.password) {
    //send back an error if there is a missing email or password
    res.status(400).json({ error: "please include all required fields." });
    return;
  }

  //check for user with email
  models.User.findOne({ where: { email: req.body.email } }).then((user) => {
    //if no user, send an error
    if (!user) {
      res
        .status(404)
        .json({ error: "Email does not exist. Please try again." });
      return;
    }

    //check password against the hash in the DB
    bcrypt.compare(req.body.password, user.password).then((match) => {
      //if no match, send error
      if (!match) {
        res
          .status(400)
          .json({ error: "Incorrect Password. Please try again." });
        return;
      }
      //log the user in. The JWT acts a credential for a user to log back in
      const token = jwt.sign(
        user.get({
          //converts sequelize object to a plain JS object
          plain: true,
        }),
        process.env.JWT_SECRET
      );

      //send success response
      res.json({ success: "logged in", token });
    });
  });
});

module.exports = router;
