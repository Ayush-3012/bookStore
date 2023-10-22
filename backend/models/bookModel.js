import mongoose from "mongoose";

const bookSchema = {
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  },
};

export const Book = mongoose.model("Book", bookSchema);
