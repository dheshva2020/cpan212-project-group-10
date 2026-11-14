
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MealPlansPage({ searchParams }) {
  const params = await searchParams;

  const filter = params?.name || "";
  const sort = params?.sort || "name";
  const page = Math.max(1, Number(params?.page) || 1);
  const limit = 10;

  const query = new URLSearchParams({
    name: filter,
    sort,
    page: String(page),
    limit: String(limit),
  });

  let plans = [];
  let totalPages = 1;
  let error = "";

  try {
    const response = await fetch(
      `${process.env.API_ORIGIN}/api/meal-plans?${query}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Could not load meal plans.");
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      plans = data;
    } else {
      plans = data.items || [];
      totalPages = data.totalPages || 1;
    }
  } catch {
    error = "Unable to load meal plans. Please try again.";
  }

  return (
    <main style={{ padding: "30px", maxWidth: "850px", margin: "auto" }}>
      <h1>My Weekly Meal Plans</h1>

      <p>
        <Link href="/meal-plans/new">Add Meal Plan</Link>
      </p>

      <form method="GET" style={{ marginBottom: "25px" }}>
        <label htmlFor="name">Filter by name: </label>
        <input
          id="name"
          name="name"
          defaultValue={filter}
          placeholder="Search meal plans"
          style={{ padding: "8px", marginRight: "12px" }}
        />

        <label htmlFor="sort">Sort: </label>
        <select
          id="sort"
          name="sort"
          defaultValue={sort}
          style={{ padding: "8px", marginRight: "12px" }}
        >
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>

        <button type="submit">Apply</button>
      </form>

      {error && <p role="alert">{error}</p>}

      {!error && plans.length === 0 && (
        <p>No meal plans found.</p>
      )}

      {!error &&
        plans.map((plan) => (
          <p key={plan.id || plan._id}>
            <Link href={`/meal-plans/${plan.id || plan._id}`}>
              {plan.name}
            </Link>
          </p>
        ))}

      {!error && (
        <div style={{ display: "flex", gap: "20px", marginTop: "25px" }}>
          {page > 1 && (
            <Link
              href={`/meal-plans?${new URLSearchParams({
                name: filter,
                sort,
                page: String(page - 1),
                limit: String(limit),
              })}`}
            >
              Previous
            </Link>
          )}

          <span>
            Page {page} of {totalPages}
          </span>

          {page < totalPages && (
            <Link
              href={`/meal-plans?${new URLSearchParams({
                name: filter,
                sort,
                page: String(page + 1),
                limit: String(limit),
              })}`}
            >
              Next
            </Link>
          )}
        </div>
      )}
    </main>
  );
}
