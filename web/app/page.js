
"use client";

import Link from "next/link";
import { useRecipe } from "../context/RecipeContext";

export default function Home() {
  const { searchTerm, setSearchTerm } = useRecipe();

  return (
    <main style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
      <h1>Recipe & Meal Planner</h1>
      <p>Search for recipes and organize your meal plans.</p>

      <h2>Find a Recipe</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Try chicken, pasta, or soup"
        aria-label="Recipe search term"
        style={{ padding: "10px", width: "100%", maxWidth: "350px" }}
      />

      <p>
        <Link href="/recipes">Search Recipes</Link>
      </p>

      <h2>Plan Your Meals</h2>
      <p>
        <Link href="/meal-plans">View Meal Plans</Link>
      </p>
      <p>
        <Link href="/meal-plans/new">Create a Meal Plan</Link>
      </p>
    </main>
  );
}
