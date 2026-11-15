# FOODIE HUB
## Complete Project Specification & Technical Documentation

### 1. Introduction

Foodie Hub is an intelligent web-based food discovery and recipe exploration platform developed to make meal discovery, culinary research, and nutritional awareness accessible, intuitive, and interactive.

The website provides a centralized hub where users can explore authentic Indian regional dishes, inspect estimated macronutrient profiles (Calories, Protein, Carbohydrates, Fats, Fibre), search and filter meals by dietary preferences, manage items in a dynamic shopping cart, and search thousands of international recipes via TheMealDB REST API.

The project is implemented using pure modern frontend technologies (HTML5, CSS3, vanilla JavaScript, and JSON) without dependencies on heavy client-side frameworks.

---

### 2. Problem Statement

With the rapid proliferation of food delivery apps, fitness trackers, and recipe blogs, modern users face several key frustrations:
1. **Information Fragmentation:** Discovering authentic traditional meals, finding recipe instructions, and tracking estimated macronutrients typically requires using three separate applications.
2. **Lack of Transparent Nutritional Breakdown:** Traditional food delivery portals highlight prices and promotions but rarely provide estimated nutritional values such as protein and fibre content.
3. **Overcomplicated User Journeys:** Many food discovery platforms impose mandatory account creation, email verification, or subscription paywalls before allowing users to view recipes and menus.

Foodie Hub directly addresses these challenges by offering an open, lightweight, single-page web platform where users can immediately browse authentic meals with estimated nutritional breakdowns, filter by lifestyle requirements (such as high-protein or low-calorie), and look up international recipes.

---

### 3. Project Objectives

The primary objectives of Foodie Hub are:
- **Food Discovery:** Curate and showcase authentic Indian regional dishes (North Indian, South Indian, Mughlai, and Ayurvedic) with rich culinary descriptions.
- **Nutritional Awareness:** Present estimated nutritional values (Calories, Protein, Carbohydrates, Fats, Fibre) to encourage balanced everyday eating.
- **Nutrition Transparency:** Prominently communicate that all nutritional values are estimated benchmarks for general awareness and not medical advice.
- **Interactive Multi-Factor Filtering:** Allow users to instantly filter the catalogue by cuisine, high-protein content (>20g), low calories (≤500 kcal), or vegetarian/vegan preferences.
- **Client-Side Cart Management:** Provide an interactive sliding cart drawer with real-time price calculations in Indian Rupees (₹ INR), free delivery threshold monitoring, and checkout simulation.
- **External REST API Integration:** Connect to TheMealDB public API to let users search international recipes and view detailed ingredients and cooking steps.
- **Robust Frontend Engineering:** Demonstrate clean JavaScript architecture, asynchronous HTTP requests (`fetch`), proper error handling, responsive design, and accessible markup.

---

### 4. Technologies Used

#### 4.1 HTML5 (HyperText Markup Language 5)
- Provides the structural foundation and semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- Implements accessible dialog modals with ARIA attributes (`aria-hidden`, `aria-label`, `role="dialog"`).

#### 4.2 CSS3 (Cascading Style Sheets 3)
- Custom CSS properties (variables) for consistent colour palettes, typography, spacing, and transition speeds.
- Modern layout systems using CSS Flexbox for one-dimensional alignments and CSS Grid for two-dimensional catalog and recipe layouts.
- Mobile-first and desktop-optimized media queries ensuring seamless responsiveness across phones, tablets, and desktops.

#### 4.3 JavaScript (ECMAScript 2020+)
- Handles all client-side logic in strict mode (`'use strict'`).
- Asynchronous data fetching via the Fetch API with `async/await`, `try/catch/finally` error boundaries, and offline fallbacks.
- State management for shopping cart items, active filters, and live search queries.
- Clean formatting using JavaScript's native `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`.

#### 4.4 JSON (JavaScript Object Notation)
- `meals.json` serves as the external data layer, decoupling dish information and estimated nutrition data from the JavaScript application code.

#### 4.5 TheMealDB REST API
- External public REST API (`https://www.themealdb.com/api/json/v1/1/`) providing global recipe data, ingredient breakdowns, and instructional videos.

#### 4.6 Development & Deployment Tools
- **Visual Studio Code:** Primary IDE with Live Server for local development.
- **Git & GitHub:** Version control, tracking changes, and hosting the repository.
- **Vercel:** Cloud platform for fast global static hosting.

---

### 5. Main Modules

#### 5.1 Hero & Navigation Module
- Responsive top navbar featuring brand logo, live menu search input, shopping cart trigger with live badge count, and mobile navigation drawer.
- Hero action area with descriptive headline, prominent call-to-action button, and quick-add showcase dishes.

#### 5.2 Indian Culinary Catalogue Module
- Asynchronously loads and renders 10 authentic Indian dishes from `meals.json`.
- Displays dish photos, regional tags, descriptions, and INR prices.
- Displays estimated nutritional values: Calories, Protein, Carbohydrates, Fats, and Fibre.

#### 5.3 Filter & Search Engine
- Real-time instant search across dish names, descriptions, and regional tags.
- Filter buttons for All Dishes, North Indian, South Indian, High Protein (>20g), Low Calorie (≤500kcal), and Vegetarian/Vegan.
- Dynamic status counter showing matching items and a reset button when filters are active.

#### 5.4 Sliding Cart Drawer & Checkout Demo
- Slide-over sidebar showing selected dishes, unit prices, line totals, and quantity controls.
- Automatically calculates subtotal, delivery fee (Free above ₹500, else ₹50), and estimated 5% GST.
- Progress bar displaying how much more needs to be added to unlock free express delivery.
- Simulated checkout modal generating random order confirmation codes.

#### 5.5 TheMealDB Global Recipe Explorer
- Dedicated section connecting to TheMealDB REST API.
- Recipe search input and horizontal category selector pills.
- Modal dialog showcasing recipe photo, categorized ingredients with exact measurements, step-by-step instructions, and YouTube tutorial links.

#### 5.6 Culinary AI Assistant (Chatbot)
- Floating widget that offers meal suggestions based on user queries.
- Runs locally with intelligent rule-based keyword matching for macros, calorie limits, and regional cuisines.
- Supports optional integration with OpenAI GPT-4o when an API key is configured.

---

### 6. System Working & Data Flow

1. **Initialization:** The browser downloads `index.html`, parses the DOM, and loads stylesheets and deferred JavaScript files (`JS/api.js` and `JS/script.js`).
2. **Catalog Fetch:** `script.js` issues `fetch('./meals.json')`. If the fetch succeeds, the data is parsed and stored in `MEALS_CATALOG`. If the request fails (such as when running directly from the local filesystem via `file://`), the application falls back gracefully to `FALLBACK_MEALS_CATALOG`.
3. **DOM Generation:** `renderMeals()` creates responsive card elements dynamically and injects them into `#mealsCatalogGrid`.
4. **State Management:** When a user modifies filters, types in the search bar, or clicks cart buttons, the corresponding application state (`activeFilter`, `activeSearchQuery`, or `cartState`) is updated and the respective UI view is re-rendered immediately.
5. **External API Requests:** When the user interacts with the Recipe Explorer, `JS/api.js` sends asynchronous HTTP requests to TheMealDB, handles responses, and renders recipe cards or modal details.

---

### 7. System Architecture

Foodie Hub follows a client-side three-tier web application architecture:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION TIER                               │
│  - Semantic HTML5 Markup                                               │
│  - Modular CSS3 Stylesheet & Responsive Breakpoints                    │
│  - Modal Dialogs, Floating Chatbot Widget, Sliding Cart Drawer         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ User Inputs & DOM Events
┌───────────────────────────────────▼────────────────────────────────────┐
│                     APPLICATION LOGIC TIER                             │
│  - JS/script.js (State management, catalog rendering, cart math)       │
│  - JS/api.js (TheMealDB REST API client & response parsers)            │
│  - Local intelligent keyword matcher for culinary suggestions          │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │ Asynchronous Fetch             │ HTTPS REST
┌───────────────────▼─────────────┐   ┌──────────────▼───────────────────┐
│           DATA TIER             │   │       EXTERNAL SERVICE           │
│  - meals.json (Local catalog)   │   │  - TheMealDB Public REST API     │
│  - Client Memory (Cart state)   │   │                                  │
└─────────────────────────────────┘   └──────────────────────────────────┘
```

---

### 8. Project Limitations

- **Frontend-Only Scope:** Foodie Hub is strictly a client-side frontend project.
- **No Backend Server:** There is no server-side application layer (Node.js, Python, PHP, etc.) handling business logic.
- **No Persistent Database:** Catalog data is loaded from a static JSON file; cart items and chat logs do not persist after full browser refresh or cache clearance.
- **No Real User Authentication:** The platform does not implement user login, registration, password encryption, or session tokens.
- **Simulated Checkout:** The checkout process is a demonstration and does not connect to real payment gateways (such as Razorpay or Stripe) or process real financial transactions.
- **Estimated Nutritional Values:** All calories, protein, carb, fat, and fibre metrics are estimated approximations for general awareness. Foodie Hub is not a medical or clinical platform and does not provide qualified dietary advice.

---

### 9. Future Enhancements

- **Backend Development:** Develop a Node.js and Express.js server to handle API routing, session management, and server-side validation.
- **Database Integration:** Connect MongoDB or PostgreSQL to persist dishes, user profiles, favourites, and order records.
- **User Authentication:** Implement secure authentication with JSON Web Tokens (JWT) or OAuth 2.0 (Google/GitHub login).
- **Live Payment Processing:** Integrate Razorpay or Stripe API to handle real online payments.
- **Personalized Macro Tracker:** Allow users to log daily meals and compare totals against personal calorie/macro targets.

---

### 10. Conclusion

Foodie Hub serves as a comprehensive demonstration of modern frontend web engineering. By combining structured local JSON data, dynamic DOM manipulation, real-time client-side search and filtering, currency localization in Indian Rupees (₹), and live REST API integration, it delivers a smooth and engaging user experience for authentic Indian culinary discovery and estimated nutritional awareness.

---

### 11. Nutrition Disclaimer

> **Important Notice:** The nutritional information displayed on Foodie Hub is estimated and provided for general informational purposes only. Actual values may vary depending on ingredients and preparation methods. This platform does not provide professional dietary or medical advice.
