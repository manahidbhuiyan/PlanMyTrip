import { Request, Response } from "express";
import User from "../models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// Render login page
export const renderLogin = (req: Request, res: Response) => {
  res.render("auth/login", { error: null });
};

// Render register page
export const renderRegister = (req: Request, res: Response) => {
  res.render("auth/register", { error: null });
};

// Render dashboard page
export const renderDashboard = (req: Request, res: Response) => {
  res.render("dashboard");
};

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // For API requests
      if (req.path.startsWith('/api/')) {
        return res.status(400).json({ message: "User already exists" });
      }
      // For form submissions
      return res.render("auth/register", { error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();
    
    // For API requests
    if (req.path.startsWith('/api/')) {
      return res.status(201).json({ message: "User registered successfully" });
    }
    
    // For form submissions
    res.redirect("/login");
  } catch (error) {
    // For API requests
    if (req.path.startsWith('/api/')) {
      return res.status(500).json({ message: "Error registering user", error: error });
    }
    
    // For form submissions
    res.render("auth/register", { error: "Error registering user" });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      // For API requests
      if (req.path.startsWith('/api/')) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // For form submissions
      return res.render("auth/login", { error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      // For API requests
      if (req.path.startsWith('/api/')) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // For form submissions
      return res.render("auth/login", { error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // For API requests
    if (req.path.startsWith('/api/')) {
      return res.json({ token, role: user.role });
    }
    
    // For form submissions - set cookie and redirect
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (err) {
    // For API requests
    if (req.path.startsWith('/api/')) {
      return res.status(500).json({ message: "Error logging in", error: err });
    }
    
    // For form submissions
    res.render("auth/login", { error: "Error logging in" });
  }
};

// LOGOUT
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect("/login");
};