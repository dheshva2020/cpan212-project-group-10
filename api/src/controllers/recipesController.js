const cache = new Map();

const BASE_URL =
  process.env.MEALDB_BASE_URL ||
  "https://www.themealdb.com/api/json/v1/1";

const TIMEOUT_MS = Number(process.env.EXTERNAL_API_TIMEOUT_MS) || 5000;
const CACHE_TTL_SECONDS = Number(process.env.CACHE_TTL_SECONDS) || 600;

export async function searchRecipes(req, res, next) {
  try {
    const query = req.query.q?.trim();

    if (!query) {
      return res.status(400).json({
        error: {
          message: "Search query is required",
          details: {
            q: "Enter a recipe search term"
          }
        }
      });
    }

    const cacheKey = query.toLowerCase();
    const cached = cache.get(cacheKey);

    if (cached && Date.now() < cached.expiresAt) {
      console.log(`Cache hit for recipe search: ${cacheKey}`);
      return res.status(200).json(cached.data);
    }

    const url = `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`;

    let response;

    try {
      response = await fetch(url, {
        signal: AbortSignal.timeout(TIMEOUT_MS)
      });
    } catch (error) {
      if (error.name === "TimeoutError") {
        return res.status(504).json({
          error: {
            message: "TheMealDB request timed out"
          }
        });
      }

      return res.status(502).json({
        error: {
          message: "Unable to reach TheMealDB"
        }
      });
    }

    if (!response.ok) {
      return res.status(502).json({
        error: {
          message: "TheMealDB returned an error"
        }
      });
    }

    const data = await response.json();

    const result = {
      query,
      recipes: (data.meals || []).map((meal) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        imageUrl: meal.strMealThumb
      }))
    };

    cache.set(cacheKey, {
      data: result,
      expiresAt: Date.now() + CACHE_TTL_SECONDS * 1000
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}