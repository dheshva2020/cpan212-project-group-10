import express from "express";
import { searchRecipes } from "../controllers/recipesController.js";

const router = express.Router();

router.get("/search", searchRecipes);

export default router;