
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditMealPlan() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPlan() {
      try {
        const response = await fetch(`/api/meal-plans/${id}`);

        if (!response.ok) {
          throw new Error("Could not load meal plan");
        }

        const plan = await response.json();

        setName(plan.name);
        setDate(plan.date);
        setNotes(plan.notes || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPlan();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`/api/meal-plans/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: "user-1",
          name,
          date,
          notes
        })
      });

      if (!response.ok) {
        throw new Error("Could not update meal plan");
      }

      router.push(`/meal-plans/${id}`);
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <p>Loading meal plan...</p>;
  }

  return (
    <main>
      <h1>Edit Meal Plan</h1>

      {error && <p role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        <p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Meal plan name"
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
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
          />
        </p>

        <button type="submit">
          Update Meal Plan
        </button>
      </form>
    </main>
  );
}
