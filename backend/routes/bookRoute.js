import express from "express";
import { Book } from "../models/bookModel.js";

const bookRouter = express.Router();

// ROUTE FOR GETTING ALL BOOKS
bookRouter.get("/", async (req, res) => {
  Book.find()
    .then((books) =>
      res.status(200).json({
        count: books.length,
        data: books,
      })
    )
    .catch((err) => res.status(400).json("Error" + err));
});

// ROUTE FOR GETTING ONE BOOK
bookRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  Book.findById(id)
    .then((book) => res.status(200).json(book))
    .catch((err) => res.status(400).json("Error" + err));
});

// ROUTE FOR UPDATING BOOK
bookRouter.put("/:id", async (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.publishYear) {
    return res.status(400).send({
      message: "Send all required fields: title, author, publishYear",
    });
  }

  const { id } = req.params;
  Book.findByIdAndUpdate(id, req.body)
    .then(() => res.status(200).json({ message: "Book Updated Successfully" }))
    .catch(() => res.status(400).json({ message: "Book Not Found" }));
});

// ROUTE TO DELETE A BOOK
bookRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Book.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Book Deleted Successfully" }))
    .catch(() => res.status(400).json({ message: "Book Not Found" }));
});

// ROUTE FOR POSTING A BOOK
bookRouter.post("/", (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.publishYear) {
    return res.status(400).send({
      message: "Send all required fields: title, author, publishYear",
    });
  }

  const newBook = {
    title: req.body.title,
    author: req.body.author,
    publishYear: req.body.publishYear,
  };

  Book.create(newBook)
    .then((book) => {
      return res.status(201).send(book);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    });
});

export default bookRouter;
