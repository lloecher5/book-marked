const express = require("express");
const checkAuth = require("../checkAuth");
const router = express.Router();
const models = require("../models");

//GET /api/v1/books/
router.get("/", checkAuth, (req, res) => {
  models.Book.findAll({ where: { UserId: req.user.id } }).then((books) => {
    res.send(books);
  });
});

//DELETE /api/v1/books/
router.delete("/:id", checkAuth, (req, res) => {
  //try and remove book with id, as long it is owned by the logged in user
  models.Book.destroy({
    where: { id: req.params.id, UserId: req.user.id },
  }).then((numberDeleted) => {
    //if there was nothing deleted, return an error
    if (numberDeleted === 0) {
      res.status(404).json({ error: "could not find that book" });
      return;
    }

    res.json({ success: "book deleted successfully" });
  });
});

//POST /api/v1/books
router.post("/", checkAuth, (req, res) => {
  //check for all required fields
  if (
    !req.body.title ||
    !req.body.author ||
    !req.body.date ||
    !req.body.notes ||
    !req.body.rating
  ) {
    res.status(400).json({ error: "please include all required fields" });
    return;
  }

  //create new book in the database
  models.Book.create({
    title: req.body.title,
    author: req.body.author,
    date: req.body.date,
    notes: req.body.notes,
    rating: req.body.rating,
    UserId: req.user.id,
  }).then((book) => {
    res.status(201).json(book);
  });
  //respond to client with new team
});

module.exports = router;
