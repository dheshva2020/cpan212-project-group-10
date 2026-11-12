
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewMealPlan() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/meal-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user-1",
          name,
          date,
          notes
        })
      });

      if (!response.ok) {
        throw new Error("Could not create meal plan");
      }

      router.push("/meal-plans");
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main>
      <h1>Add Meal Plan</h1>

      <form onSubmit={handleSubmit}>
        <p>
          <input
            placeholder="Meal plan name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </p>

        <p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </p>

        <p>
          <input
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </p>

        <button type="submit"> Create Meal Plan</button>
      </form>

      {error && <p>{error}</p>}
    </main>
  );
}
