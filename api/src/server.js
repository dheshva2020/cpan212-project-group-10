import express from "express";
import mealPlansRoutes from "./routes/mealPlansRoutes.js";
import recipesRoutes from "./routes/recipesRoutes.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Recipe & Meal Planner API is running"
  });
});

app.use("/api/meal-plans", mealPlansRoutes);
app.use("/api/recipes", recipesRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});