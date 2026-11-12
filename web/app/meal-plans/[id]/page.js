
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MealPlanDetails({ params }) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.API_ORIGIN || "http://localhost:4000"}/api/meal-plans/${id}`,
    { cache: "no-store" }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Could not load meal plan");
  }

  const plan = await response.json();

  return (
    <main>
      <h1>{plan.name}</h1>

      <p>Date: {plan.date}</p>
      <p>Notes: {plan.notes || "No notes"}</p>

      <p>
        <Link href={`/meal-plans/${id}/edit`}>
          Edit Meal Plan
        </Link>
      </p>

      <p>
        <Link href="/meal-plans">
          Back to Meal Plans
        </Link>
      </p>
    </main>
  );
}
