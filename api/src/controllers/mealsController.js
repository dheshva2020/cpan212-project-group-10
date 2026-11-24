import { z } from "zod";
import Meal from "../models/Meal.js";
import MealPlan from "../models/MealPlan.js";

const mealSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  category: z.string().trim().min(1, "Category is required"),
  ingredients: z.array(z.string().trim().min(1)).min(1),
  instructions: z.string().trim().min(1, "Instructions are required")
}).strict();

function validateMeal(body) {
  const result = mealSchema.safeParse(body);

  if (!result.success) {
    const error = new Error("Validation failed");
    error.status = 400;
    error.details = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message
    }));

    throw error;
  }

  return result.data;
}

export async function getAllMeals(req, res, next) {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (error) {
    next(error);
  }
}

export async function getMealById(req, res, next) {
  try {
    const meal = await Meal.findOne({
      id: req.params.id
    });

    if (!meal) {
      return res.status(404).json({
        error: {
          message: "Meal not found",
          details: null
        }
      });
    }

    res.status(200).json(meal);
  } catch (error) {
    next(error);
  }
}

export async function createMeal(req, res, next) {
  try {
    const data = validateMeal(req.body);
    const meal = await Meal.create(data);

    res.status(201).json(meal);
  } catch (error) {
    next(error);
  }
}

export async function updateMeal(req, res, next) {
  try {
    const data = validateMeal(req.body);

    const meal = await Meal.findOneAndUpdate(
      { id: req.params.id },
      data,
      {
        new: true,
        runValidators: true
      }
    );

    if (!meal) {
      return res.status(404).json({
        error: {
          message: "Meal not found",
          details: null
        }
      });
    }

    res.status(200).json(meal);
  } catch (error) {
    next(error);
  }
}

export async function deleteMeal(req, res, next) {
  try {
    const meal = await Meal.findOne({
      id: req.params.id
    });

    if (!meal) {
      return res.status(404).json({
        error: {
          message: "Meal not found",
          details: null
        }
      });
    }

    await MealPlan.updateMany(
      { meals: meal._id },
      { $pull: { meals: meal._id } }
    );

    await meal.deleteOne();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}