import { Router } from "express";
import Hotel from "../models/Hotel.model"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: Hotel management APIs
 */

/**
 * @swagger
 * /hotels:
 *   get:
 *     summary: Get all hotels
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: List of all hotels
 */
router.get("/", async (req, res) => {
  const tours = await Hotel.find();
  res.json(tours);
});

/**
 * @swagger
 * /hotels:
 *   post:
 *     summary: Create a new hotel
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Hotel created successfully
 */
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  await newHotel.save();
  res.json(newHotel);
});

export default router