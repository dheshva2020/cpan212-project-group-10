
const API = process.env.API_ORIGIN || "http://localhost:4000";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const response = await fetch(
      `${API}/api/meal-plans/${id}`,
      { cache: "no-store" }
    );

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch {
    return Response.json(
      { error: "Could not load meal plan" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;

  try {
    const body = await request.json();

    const response = await fetch(
      `${API}/api/meal-plans/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    );

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch {
    return Response.json(
      { error: "Could not update meal plan" },
      { status: 500 }
    );
  }
}
