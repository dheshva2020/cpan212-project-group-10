# Contributions

## M1

### Prabu Elangovan (@dheshva2020)
- Set up the project repository structure.
- Researched TheMealDB external API and tested an example API request.
- Created the draft data model.
- Created the API endpoint list.
- Added the team roles.
- Created the project `.gitignore`.

### Syeda Shah (@nowalshah)
- Responsible for problem and target users.
- Responsible for MVP and later features.
- Responsible for wireframes.

## M2

### Prabu Elangovan (@dheshva2020)
- Set up the Node.js 24 and Express 5 API project.
- Implemented Meal Plans CRUD endpoints.
- Added Zod validation for Meal Plans create and update requests.
- Implemented TheMealDB recipe search endpoint.
- Added external API timeout handling and in-memory caching.
- Added cache-hit logging.
- Updated the API README with setup instructions and endpoint documentation.
- Initial M2 commit: 7c7d567.

### Syeda Shah (@nowalshah)
- Implemented Meals CRUD endpoints (GET, POST, PUT, DELETE).
- Added Zod validation for Meals create and update requests.
- Added 404 and error-handling middleware.
- Created Bruno requests and tests for Meals and error responses.
- Commit: 1114b18.

## M3

### Syeda Shah (@nowalshah)
- Created React Context to share recipe search state between the Home and Recipes pages.
- Developed the Recipe Search page using the Express API.
- Displayed recipe images, names, categories, and origins.
- Added loading, empty-result, and error states.
- Updated the Home page and navigation links.
- Configured Next.js API rewrites using API_ORIGIN.
- Added the example environment configuration.
- Successfully built the Next.js frontend.
- Tested recipe search with the running Express backend.


## M4

### Syeda Shah (@nowalshah)
- Improved the Meal Plans page by adding a search filter to help users find meal plans by name.
- Added sorting options to organize meal plans by name or date.
- Implemented pagination with Previous and Next buttons.
- Updated the Add Meal Plan form to display validation errors beside the correct fields, making it easier for users to understand and fix mistakes.
- Improved error handling in the Edit Meal Plan form.
- Tested the frontend using `npm run build` and confirmed it compiled successfully.