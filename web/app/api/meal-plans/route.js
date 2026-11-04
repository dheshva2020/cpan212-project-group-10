
export async function POST(request) {
  const data = await request.json();

  const response = await fetch(
    `${process.env.API_ORIGIN}/api/meal-plans`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );

  const result = await response.json();

  return Response.json(result, {
    status: response.status
  });
}
