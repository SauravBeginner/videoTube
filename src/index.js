import mongoose from "mongoose";

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDB();

/*
import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI} / ${DB_NAME}`);
    app.on((error) => {
      console.log(`❌ Error on DB Connection:${error}`);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`✅ Server is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ DB Connection Error: ${error}");
    throw error;
  }
})();
*/
