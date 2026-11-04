
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MealPlansPage() {
  const response = await fetch(
    `${process.env.API_ORIGIN}/api/meal-plans`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Could not load meal plans");
  }

  const plans = await response.json();

  return (
    <main>
      <h1>My Meal Plans</h1>

      <p>
        <Link href="/meal-plans/new">Add Meal Plan</Link>
      </p>

      {plans.length === 0 && <p>No meal plans found.</p>}

      {plans.map((plan) => (
        <p key={plan.id}>
          <Link href={`/meal-plans/${plan.id}`}>
            {plan.name}
          </Link>
        </p>
      ))}
    </main>
  );
}
