import { Router } from "express";
import Tour from "../models/Tour.model";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tours
 *   description: Tour management APIs
 */

/**
 * @swagger
 * /tours:
 *   get:
 *     summary: Get all tours
 *     tags: [Tours]
 *     responses:
 *       200:
 *         description: List of all tours
 */
router.get("/", async (req, res) => {
  const tours = await Tour.find();
  res.json(tours);
});


/**
 * @swagger
 * /tours:
 *   post:
 *     summary: Create a new tour
 *     tags: [Tours]
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
 *         description: Tour created successfully
 */
router.post("/", async (req, res) => {
  const newTour = new Tour(req.body);
  await newTour.save();
  res.json(newTour);
});

export default router;
