import "dotenv/config";
import mongoose from "mongoose";

import Meal from "../models/Meal.js";
import MealPlan from "../models/MealPlan.js";

import { meals } from "../data/meals.js";
import { mealPlans } from "../data/mealPlans.js";

async function seedDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");

    // Seed Meals
    for (const meal of meals) {
      await Meal.updateOne(
        { id: meal.id },
        { $setOnInsert: meal },
        { upsert: true, runValidators: true }
      );
    }

    console.log("Meals seeded successfully");

    const savedMeals = await Meal.find({
      id: { $in: meals.map(meal => meal.id) }
    });

    // Seed Meal Plans with meal relationships
    for (const plan of mealPlans) {
      await MealPlan.updateOne(
        { id: plan.id },
        {
          $setOnInsert: {
            ...plan,
            meals: savedMeals.map(meal => meal._id)
          }
        },
        { upsert: true, runValidators: true }
      );
    }

    console.log("Meal plans seeded successfully");
    console.log("Database seeding completed successfully");

  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;

  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
}

seedDatabase();