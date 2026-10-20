import express from "express";
import {
  getAllMealPlans,
  getMealPlanById,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan
} from "../controllers/mealPlansController.js";

const router = express.Router();

router.get("/", getAllMealPlans);
router.get("/:id", getMealPlanById);
router.post("/", createMealPlan);
router.put("/:id", updateMealPlan);
router.delete("/:id", deleteMealPlan);

export default router;