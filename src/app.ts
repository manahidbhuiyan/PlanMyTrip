import express from "express";
import userRoutes from "./routes/user.routes";
import tourRoutes from "./routes/tour.routes";
import hotelRoutes from "./routes/hotel.routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/hotels", hotelRoutes);

export default app;
