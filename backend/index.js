import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRouter from "./routes/bookRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(uri);

app.get("/", async (req, res) => {
  res.status(200).send("Loaded");
});

app.use("/books", bookRouter);

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
