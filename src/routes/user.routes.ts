import express from "express";
import { register, login } from "../controllers/auth.controller";
// import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

// API routes
router.post("/register", register);
router.post("/login", login);

//example protected route
// router.get("/admin-only", authMiddleware, roleMiddleware(["admin", "superAdmin"]), (req, res) => {
//   res.json({ message: "Welcome Admin or SuperAdmin!" });
// });
// router.get(
//   "/super-admin",
//   authMiddleware,
//   roleMiddleware(["superAdmin"]),
//   (req, res) => {
//     res.json({ message: "Only SuperAdmin can access" });
//   }
// );

export default router;