import express from 'express';
import mongoose from 'mongoose';
import { userRouter } from './APIs/UserAPI.js';
import cors from 'cors';
import { authorRouter } from './APIs/AuthorAPI.js';
import {clerkMiddleware} from '@clerk/express';
import {config} from 'dotenv';


// create express app FIRST
const app = express();

// port number
const PORT = 4000;

// middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(clerkMiddleware());
app.use('/user-api', userRouter);
app.use('/author-api', authorRouter);

// test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is working fine!" });
});

// db connection
async function connectDB() {
  await mongoose.connect("mongodb://localhost:27017/vnrblog2026");
  console.log("DB connection success");

  app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
  );
}

connectDB();
