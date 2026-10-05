# Recipe & Meal Planner
## CPAN 212 Term Project - Group 10

### Group Members
- Prabu Elangovan (@dheshva2020)
- Syeda Shah (@nowalshah)

## 1. Problem and Users

## 2. MVP Features

## Later Features

## 3. External API


### TheMealDB

We will use TheMealDB as the external API for the Recipe & Meal Planner. The API will allow users to search for recipes and view meal information such as the meal name, category, cuisine, instructions, image, ingredients, and measurements.

Documentation: https://www.themealdb.com/api.php

TheMealDB provides a free recipe API. Our Express server will call TheMealDB, and the frontend will receive the recipe information through our own API endpoint.


### API Key and Usage

TheMealDB uses API keys in the request URL. For development and educational use, the free test key `1` can be used. Our example request uses this key in `/v1/1/`. The free API is suitable for development and educational projects. TheMealDB states that public app-store releases require supporter access. The documentation does not state a specific numeric rate limit for the free educational API.

### Example API Request

https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
### Trimmed API Response

```json
{
  "meals": [
    {
      "idMeal": "52795",
      "strMeal": "Chicken Handi",
      "strCategory": "Chicken",
      "strArea": "Indian",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
      "strIngredient1": "Chicken",
      "strIngredient2": "Onion",
      "strIngredient3": "Tomatoes"
    }
  ]
}

## 4. Data Model

### User

| Field | Type | Required |
|---|---|---|
| id | String | Yes |
| name | String | Yes |
| email | String | Yes |
| password | String | Yes |

### MealPlan

| Field | Type | Required |
|---|---|---|
| id | String | Yes |
| userId | String | Yes |
| name | String | Yes |
| date | String | Yes |
| notes | String | No |

### Meal

| Field | Type | Required |
|---|---|---|
| id | String | Yes |
| mealPlanId | String | Yes |
| name | String | Yes |
| category | String | No |
| area | String | No |
| imageUrl | String | No |
| externalMealId | String | No |

### Relationships

- A User can own many MealPlans.
- A MealPlan belongs to one User.
- A MealPlan can contain many Meals.
- A Meal belongs to one MealPlan.

## 5. API Endpoints

| Method | Path | Purpose | Success | Errors |
|---|---|---|---|---|
| GET | /api/meal-plans | List all meal plans | 200 | 500 |
| GET | /api/meal-plans/:id | Get one meal plan | 200 | 404, 500 |
| POST | /api/meal-plans | Create a new meal plan | 201 | 400, 500 |
| PUT | /api/meal-plans/:id | Update a meal plan | 200 | 400, 404, 500 |
| DELETE | /api/meal-plans/:id | Delete a meal plan | 204 | 404, 500 |
| GET | /api/meals | List all meals | 200 | 500 |
| GET | /api/meals/:id | Get one meal | 200 | 404, 500 |
| POST | /api/meals | Create a new meal | 201 | 400, 500 |
| PUT | /api/meals/:id | Update a meal | 200 | 400, 404, 500 |
| DELETE | /api/meals/:id | Delete a meal | 204 | 404, 500 |
| GET | /api/recipes/search?q=chicken | Search recipes using TheMealDB | 200 | 400, 502, 504 |

## 6. Wireframes

## 7. Team Roles

### Prabu Elangovan
- API Lead
- Repository and Pull Request Lead

### Syeda Shah
- Frontend Lead
- Database Lead

All team members will contribute code during the later milestones.
