import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Users API Working ✅" });
});

export default router;
