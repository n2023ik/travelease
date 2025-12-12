import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import bookingsRouter from "./routes/bookings.js";
import inventoryRouter from "./routes/inventory.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/travelease";

app.use(cors());
app.use(express.json());
app.use(express.static("."));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.use("/api/bookings", bookingsRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/auth", authRouter);

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Mongo connection failed", error.message);
  }

  app.listen(PORT, () => {
    console.log(`TravelEase API running on port ${PORT}`);
  });
}

startServer();



