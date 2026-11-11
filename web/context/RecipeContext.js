"use client";

import { createContext, useContext, useState } from "react";

const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <RecipeContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipe() {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error("useRecipe must be used inside RecipeProvider");
  }

  return context;
}
