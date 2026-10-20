import express from "express";
import {
  getAllMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal
} from "../controllers/mealsController.js";

const router = express.Router();

router.get("/", getAllMeals);
router.get("/:id", getMealById);
router.post("/", createMeal);
router.put("/:id", updateMeal);
router.delete("/:id", deleteMeal);

export default router;