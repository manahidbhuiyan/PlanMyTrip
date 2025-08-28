import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

interface DecodedToken {
  id: string;
  role: "user" | "admin" | "superAdmin";
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Check for token in cookies first, then in Authorization header
  const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.redirect("/login");
  }
};

export const roleMiddleware = (roles: ("user" | "admin" | "superAdmin")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
