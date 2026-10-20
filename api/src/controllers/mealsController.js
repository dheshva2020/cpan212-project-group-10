import { randomUUID } from "node:crypto";
import { z } from "zod";
import { meals } from "../data/meals.js";

const mealSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  category: z.string().trim().min(1, "Category is required"),
  ingredients: z.array(z.string().trim().min(1)).min(1),
  instructions: z.string().trim().min(1, "Instructions are required")
}).strict();

function validateMeal(body) {
  const result = mealSchema.safeParse(body);

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

export function getAllMeals(req, res) {
  res.status(200).json(meals);
}

export function getMealById(req, res) {
  const meal = meals.find((item) => item.id === req.params.id);

  if (!meal) {
    return res.status(404).json({
      error: { message: "Meal not found", details: null }
    });
  }

  res.status(200).json(meal);
}

export function createMeal(req, res) {
  const data = validateMeal(req.body);
  const meal = { id: randomUUID(), ...data };

  meals.push(meal);
  res.status(201).json(meal);
}

export function updateMeal(req, res) {
  const meal = meals.find((item) => item.id === req.params.id);

  if (!meal) {
    return res.status(404).json({
      error: { message: "Meal not found", details: null }
    });
  }

  const data = validateMeal(req.body);
  Object.assign(meal, data);

  res.status(200).json(meal);
}

export function deleteMeal(req, res) {
  const index = meals.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      error: { message: "Meal not found", details: null }
    });
  }

  meals.splice(index, 1);
  res.status(204).send();
}