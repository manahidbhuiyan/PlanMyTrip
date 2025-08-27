import { Router } from "express";
import TripInformation from "../models/TripNavigator.model"

const router = Router();

// Get all TripInformation
router.get("/", async (req, res) => {
  const tripNavigator = await TripInformation.find();
  res.json(tripNavigator);
});

// Create new TripInformation
router.post("/", async (req, res) => {
  const newtripNavigator = new TripInformation(req.body);
  await newtripNavigator.save();
  res.json(newtripNavigator);
});


export default router;
