import { randomUUID } from "node:crypto";
import { mealPlans } from "../data/mealPlans.js";

export function getAllMealPlans(req, res) {
  res.status(200).json(mealPlans);
}

export function getMealPlanById(req, res) {
  const mealPlan = mealPlans.find((plan) => plan.id === req.params.id);

  if (!mealPlan) {
    return res.status(404).json({
      error: {
        message: "Meal plan not found"
      }
    });
  }

  res.status(200).json(mealPlan);
}

export function createMealPlan(req, res) {
  const { userId, name, date, notes } = req.body;

  const newMealPlan = {
    id: randomUUID(),
    userId,
    name,
    date,
    notes: notes || ""
  };

  mealPlans.push(newMealPlan);

  res.status(201).json(newMealPlan);
}

export function updateMealPlan(req, res) {
  const mealPlan = mealPlans.find((plan) => plan.id === req.params.id);

  if (!mealPlan) {
    return res.status(404).json({
      error: {
        message: "Meal plan not found"
      }
    });
  }

  const { userId, name, date, notes } = req.body;

  mealPlan.userId = userId;
  mealPlan.name = name;
  mealPlan.date = date;
  mealPlan.notes = notes || "";

  res.status(200).json(mealPlan);
}

export function deleteMealPlan(req, res) {
  const index = mealPlans.findIndex((plan) => plan.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      error: {
        message: "Meal plan not found"
      }
    });
  }

  mealPlans.splice(index, 1);

  res.status(204).send();
}