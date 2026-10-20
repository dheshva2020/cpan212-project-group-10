import express from "express";
import mealPlansRoutes from "./routes/mealPlansRoutes.js";
import mealsRoutes from "./routes/mealsRoutes.js";
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
app.use("/api/meals", mealsRoutes);
app.use("/api/recipes", recipesRoutes);

// If the route does not exist
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: "Route not found",
      details: null
    }
  });
});

// Handle errors from the API
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: status === 500
        ? "Internal server error"
        : err.message,
      details: status === 500 ? null : (err.details || null)
    }
  });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
