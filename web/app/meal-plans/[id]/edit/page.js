
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    async function loadPlan() {
      try {
        const response = await fetch(`/api/meal-plans/${id}`);

        if (!response.ok) {
          throw new Error("Could not load meal plan");
        }

        const plan = await response.json();

        setName(plan.name || "");
        setDate(plan.date ? plan.date.slice(0, 10) : "");
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
    setFieldErrors({});
    setSaving(true);

    try {
      const response = await fetch(`/api/meal-plans/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user-1",
          name,
          date,
          notes
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const details = data.error?.details || data.details;

        if (response.status === 400 && Array.isArray(details)) {
          const errors = {};

          details.forEach((item) => {
            if (item.field) {
              errors[item.field] = item.message;
            }
          });

          setFieldErrors(errors);
          setError("Please correct the highlighted fields.");
          return;
        }

        throw new Error(
          data.error?.message ||
          data.message ||
          "Could not update meal plan"
        );
      }

      router.push(`/meal-plans/${id}`);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading meal plan...</p>;
  }

  return (
    <main>
      <h1>Edit Meal Plan</h1>

      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Meal Plan Name</label>
          <br />
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Meal plan name"
            aria-invalid={Boolean(fieldErrors.name)}
            required
          />
          {fieldErrors.name && (
            <span role="alert" style={{ color: "red" }}>
              {fieldErrors.name}
            </span>
          )}
        </p>

        <p>
          <label htmlFor="date">Date</label>
          <br />
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-invalid={Boolean(fieldErrors.date)}
            required
          />
          {fieldErrors.date && (
            <span role="alert" style={{ color: "red" }}>
              {fieldErrors.date}
            </span>
          )}
        </p>

        <p>
          <label htmlFor="notes">Notes</label>
          <br />
          <input
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
            aria-invalid={Boolean(fieldErrors.notes)}
          />
          {fieldErrors.notes && (
            <span role="alert" style={{ color: "red" }}>
              {fieldErrors.notes}
            </span>
          )}
        </p>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update Meal Plan"}
        </button>
      </form>
    </main>
  );
}
