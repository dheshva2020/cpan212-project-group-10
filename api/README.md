# Recipe & Meal Planner API

Express REST API for the Recipe & Meal Planner.

## Requirements

- Node.js 24 or newer
- npm

## Install

From the `api` folder:

npm install

## Run

Development mode:

npm run dev

Normal mode:

npm start

The API runs on:

http://localhost:4000

## Environment Variables

Copy `.env.example` to `.env` if custom settings are needed.

- `PORT` - API port. Default: 4000
- `MEALDB_BASE_URL` - TheMealDB base URL
- `EXTERNAL_API_TIMEOUT_MS` - External API timeout
- `CACHE_TTL_SECONDS` - Recipe search cache duration

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/meal-plans` | List all meal plans |
| GET | `/api/meal-plans/:id` | Get one meal plan |
| POST | `/api/meal-plans` | Create a meal plan |
| PUT | `/api/meal-plans/:id` | Update a meal plan |
| DELETE | `/api/meal-plans/:id` | Delete a meal plan |
| GET | `/api/meals` | List all meals |
| GET | `/api/meals/:id` | Get one meal |
| POST | `/api/meals` | Create a meal |
| PUT | `/api/meals/:id` | Update a meal |
| DELETE | `/api/meals/:id` | Delete a meal |
| GET | `/api/recipes/search?q=chicken` | Search recipes using TheMealDB |

## Validation

POST and PUT requests are validated using Zod. Invalid data returns HTTP 400 with validation details.

Unknown resource IDs return HTTP 404.

## External API

Recipe search uses TheMealDB.

The server uses:

- Server-side `fetch`
- `AbortSignal.timeout()` for timeout handling
- In-memory caching with expiry
- Cache-hit logging in the terminal
- HTTP 502 for external API errors
- HTTP 504 for timeouts

To test the cache, request the same recipe search twice:

`GET /api/recipes/search?q=chicken`

The second request should display a cache-hit message in the server terminal.