import { Router } from "express";
import TripInformation from "../models/TripNavigator.model"

const router = Router();

/**
 * @swagger
 * tags:
 *   name: TripInformation
 *   description: Tour management APIs
 */

/**
 * @swagger
 * /tripInformation:
 *   get:
 *     summary: Get all TripInformation
 *     tags: [TripInformation]
 *     responses:
 *       200:
 *         description: List of all tripInformation
 */
router.get("/", async (req, res) => {
  const tripNavigator = await TripInformation.find();
  res.json(tripNavigator);
});

/**
 * @swagger
 * /tripInformation:
 *   post:
 *     summary: Create a new TripInformation
 *     tags: [TripInformation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: TripInformation created successfully
 */
router.post("/", async (req, res) => {
  const newtripNavigator = new TripInformation(req.body);
  await newtripNavigator.save();
  res.json(newtripNavigator);
});


export default router;
