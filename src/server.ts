import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { swaggerDocs } from "./config/swagger";

import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5005;

// DB connect
connectDB();

const server = express();

server.use(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  swaggerDocs(app, Number(PORT));
});
