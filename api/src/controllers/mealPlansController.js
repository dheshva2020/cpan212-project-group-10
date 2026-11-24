import { z } from "zod";
import MealPlan from "../models/MealPlan.js";
import Meal from "../models/Meal.js";

const mealPlanSchema = z.object({
  userId: z.string().trim().min(1, "User ID is required"),
  name: z.string().trim().min(1, "Name is required"),
  date: z.string().trim().min(1, "Date is required"),
  notes: z.string().trim().optional(),
  meals: z.array(
    z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid meal ID")
  ).optional()
}).strict();

async function validateMealPlan(body) {
  const result = mealPlanSchema.safeParse(body);

  if (!result.success) {
    const error = new Error("Validation failed");
    error.status = 400;
    error.details = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message
    }));
    throw error;
  }

  const data = result.data;

  if (data.meals) {
    const ids = [...new Set(data.meals)];

    const count = await Meal.countDocuments({
      _id: { $in: ids }
    });

    if (count !== ids.length) {
      const error = new Error("Validation failed");
      error.status = 400;
      error.details = [{
        field: "meals",
        message: "One or more meals do not exist"
      }];
      throw error;
    }
  }

  return data;
}

// Filtering, sorting and pagination
export async function getAllMealPlans(req, res, next) {
  try {
    const name = typeof req.query.name === "string"
      ? req.query.name.trim()
      : "";

    const sort = req.query.sort === "date"
      ? "date"
      : "name";

    const page = Math.max(
      1,
      parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit, 10) || 10)
    );

    const filter = {};

    if (name) {
      const safeName = name.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.name = {
        $regex: safeName,
        $options: "i"
      };
    }

    const hasQuery = ["name", "sort", "page", "limit"]
      .some(key => req.query[key] !== undefined);

    // Preserve compatibility with previous API clients
    if (!hasQuery) {
      const plans = await MealPlan.find()
        .populate("meals");

      return res.status(200).json(plans);
    }

    const total = await MealPlan.countDocuments(filter);

    const items = await MealPlan.find(filter)
      .sort({ [sort]: 1, _id: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("meals");

    res.status(200).json({
      items,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit))
    });

  } catch (error) {
    next(error);
  }
}

export async function getMealPlanById(req, res, next) {
  try {
    const mealPlan = await MealPlan.findOne({
      id: req.params.id
    }).populate("meals");

    if (!mealPlan) {
      return res.status(404).json({
        error: {
          message: "Meal plan not found",
          details: null
        }
      });
    }

    res.status(200).json(mealPlan);

  } catch (error) {
    next(error);
  }
}

export async function createMealPlan(req, res, next) {
  try {
    const data = await validateMealPlan(req.body);

    const mealPlan = await MealPlan.create({
      ...data,
      notes: data.notes || ""
    });

    await mealPlan.populate("meals");

    res.status(201).json(mealPlan);

  } catch (error) {
    next(error);
  }
}

export async function updateMealPlan(req, res, next) {
  try {
    const data = await validateMealPlan(req.body);

    const mealPlan = await MealPlan.findOneAndUpdate(
      { id: req.params.id },
      {
        ...data,
        notes: data.notes || ""
      },
      {
        new: true,
        runValidators: true
      }
    ).populate("meals");

    if (!mealPlan) {
      return res.status(404).json({
        error: {
          message: "Meal plan not found",
          details: null
        }
      });
    }

    res.status(200).json(mealPlan);

  } catch (error) {
    next(error);
  }
}

export async function deleteMealPlan(req, res, next) {
  try {
    const mealPlan = await MealPlan.findOneAndDelete({
      id: req.params.id
    });

    if (!mealPlan) {
      return res.status(404).json({
        error: {
          message: "Meal plan not found",
          details: null
        }
      });
    }

    res.status(204).send();

  } catch (error) {
    next(error);
  }
}