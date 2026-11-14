# Recipe & Meal Planner

CPAN 212 Term Project - Group 10

## Group Members
- Prabu Elangovan (@Dheshva2020)
- Syeda Shah (@nowalshah)

## Milestone 3 - Next.js Frontend

We developed a Next.js frontend connected to our Express REST API.

### Features
- Meal Plans list page
- View individual Meal Plan details
- Create new Meal Plans
- Edit existing Meal Plans
- Recipe Search using TheMealDB through our Express API
- React Context for shared state
- Loading, empty-result, and error handling

### How to Run

1. Open the project in VS Code.
2. Open a terminal and start the Express API:

   cd api
   npm install
   npm run dev

3. Open a second terminal and start Next.js:

   cd web
   npm install
   npm run dev

4. Open http://localhost:3000/meal-plans
5. Open http://localhost:3000/recipes for Recipe Search.

### Testing

The Meal Plans list, details, create, and edit pages
were tested with the Express API.

The Next.js production build was successful
using npm run build.

## Milestone 4 - MongoDB Integration

In M4, we are adding MongoDB to save Meals and Meal Plans in the database.

### Database Setup
- Set up MongoDB locally or use MongoDB Atlas.
- Add `MONGODB_URI` to the API `.env` file.
- Run `npm install` inside the `api` folder.
- Run `npm run seed` to add sample data.
- Start the API using `npm run dev`.

### New Features
- Added filtering and sorting options to the Meal Plans page.
- Added Previous and Next buttons for pagination.
- Improved validation error messages in the Add and Edit Meal Plan forms.

### Testing
The frontend was tested using `npm run build`, and the build was successful.