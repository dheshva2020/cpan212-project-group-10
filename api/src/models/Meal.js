import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

const mealSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: randomUUID,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    ingredients: {
      type: [{
        type: String,
        required: true,
        trim: true
      }],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one ingredient is required"
      }
    },
    instructions: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;