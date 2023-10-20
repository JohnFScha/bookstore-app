// Imports
import "dotenv/config";
import express from "express";
import { connect } from "mongoose";
import bookRouter from "./routes/books.routes.js";
import cors from 'cors';

// Config
const app = express();
const PORT = process.env.PORT;

// Middeware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({  // Select specific allowed origins and methods.
  origin: 'http://localhost:5173',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
})) 

// App
connect(process.env.MONGO_DB_CONNECT)
  .then(async () => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  })
  .catch((error) => {
    throw new Error(`Error connecting to DB: ${error}`);
  });

// Routes

app.use('/books', bookRouter);