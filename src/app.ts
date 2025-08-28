import express from "express";
import userRoutes from "./routes/user.routes";
import tourRoutes from "./routes/tour.routes";
import hotelRoutes from "./routes/hotel.routes";
import tripNavigatorRoutes from "./routes/tripNavigator.routes";
import { renderLogin, renderRegister, renderDashboard, login, register, logout } from "./controllers/auth.controller";
import { authMiddleware } from "./middleware/auth.middleware";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(cookieParser()); // For handling cookies

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/tripNavigator", tripNavigatorRoutes);

// View routes
app.get("/", (req, res) => res.redirect("/login"));
app.get("/login", renderLogin);
app.get("/register", renderRegister);
app.get("/dashboard", authMiddleware, renderDashboard);

// Handle form submissions
app.post("/login", login);
app.post("/register", register);
app.post("/logout", logout);

export default app;