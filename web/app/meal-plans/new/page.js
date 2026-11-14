
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewMealPlan() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setSaving(true);

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
          "Could not create meal plan"
        );
      }

      router.push("/meal-plans");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main>
      <h1>Add Meal Plan</h1>

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Meal Plan Name</label>
          <br />
          <input
            id="name"
            placeholder="Meal plan name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            aria-invalid={Boolean(fieldErrors.notes)}
          />
          {fieldErrors.notes && (
            <span role="alert" style={{ color: "red" }}>
              {fieldErrors.notes}
            </span>
          )}
        </p>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Create Meal Plan"}
        </button>
      </form>

      {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
