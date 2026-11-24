import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

const mealPlanSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: randomUUID,
      unique: true,
      required: true
    },
    userId: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: String,
      required: true,
      trim: true
    },
    notes: {
      type: String,
      default: "",
      trim: true
    },
    meals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal"
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

export default MealPlan;