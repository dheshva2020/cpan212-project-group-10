
"use client";

import { useState } from "react";
import { useRecipe } from "../../context/RecipeContext";

export default function RecipesPage() {
  const { searchTerm, setSearchTerm } = useRecipe();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event) {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setError("Please enter a recipe name.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);
    setRecipes([]);

    try {
      const response = await fetch(
        `/api/recipes/search?q=${encodeURIComponent(searchTerm.trim())}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Recipe search failed.");
      }

      setRecipes(data.recipes || []);
    } catch (err) {
      setError(err.message || "Unable to search recipes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1>Search Recipes</h1>
      <p>Find recipes using TheMealDB through our Express API.</p>

      <form onSubmit={handleSearch} style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Enter a recipe name"
          aria-label="Recipe name"
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading && <p role="status">Loading recipes...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && searched && recipes.length === 0 && (
        <p>No recipes found. Try another search.</p>
      )}

      {!loading && !error && recipes.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          {recipes.map((recipe) => (
            <article
              key={recipe.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
              }}
            >
              {recipe.imageUrl && (
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  style={{ width: "100%", borderRadius: "6px" }}
                />
              )}
              <h2>{recipe.name}</h2>
              <p>Category: {recipe.category || "Unknown"}</p>
              <p>Origin: {recipe.area || "Unknown"}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
