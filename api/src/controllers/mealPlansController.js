import { randomUUID } from "node:crypto";
import { z } from "zod";
import { mealPlans } from "../data/mealPlans.js";

const mealPlanSchema = z.object({
  userId: z.string().trim().min(1, "User ID is required"),
  name: z.string().trim().min(1, "Name is required"),
  date: z.string().trim().min(1, "Date is required"),
  notes: z.string().trim().optional()
}).strict();

function validateMealPlan(body) {
  const result = mealPlanSchema.safeParse(body);

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message
    }));

    const error = new Error("Validation failed");
    error.status = 400;
    error.details = details;
    throw error;
  }

  return result.data;
}

export function getAllMealPlans(req, res) {
  res.status(200).json(mealPlans);
}

export function getMealPlanById(req, res) {
  const mealPlan = mealPlans.find((plan) => plan.id === req.params.id);

  if (!mealPlan) {
    return res.status(404).json({
      error: {
        message: "Meal plan not found",
        details: null
      }
    });
  }

  res.status(200).json(mealPlan);
}

export function createMealPlan(req, res) {
  const data = validateMealPlan(req.body);

  const newMealPlan = {
    id: randomUUID(),
    ...data,
    notes: data.notes || ""
  };

  mealPlans.push(newMealPlan);

  res.status(201).json(newMealPlan);
}

export function updateMealPlan(req, res) {
  const mealPlan = mealPlans.find((plan) => plan.id === req.params.id);

  if (!mealPlan) {
    return res.status(404).json({
      error: {
        message: "Meal plan not found",
        details: null
      }
    });
  }

  const data = validateMealPlan(req.body);

  Object.assign(mealPlan, data);
  mealPlan.notes = data.notes || "";

  res.status(200).json(mealPlan);
}

export function deleteMealPlan(req, res) {
  const index = mealPlans.findIndex((plan) => plan.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      error: {
        message: "Meal plan not found",
        details: null
      }
    });
  }

  mealPlans.splice(index, 1);

  res.status(204).send();
}