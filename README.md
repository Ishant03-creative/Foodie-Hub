# Foodie Hub 🍽️
### Discover Meals, Explore Recipes, Eat Smarter.

Foodie Hub is a web-based food discovery and recipe exploration platform designed to help users discover authentic Indian dishes, explore worldwide recipes, and understand estimated nutritional values in one centralized, intuitive interface.

The platform provides a responsive, interactive user experience where visitors can browse meals, filter by regional cuisines and nutritional preferences, calculate estimated macros, manage selections via an interactive cart drawer, and explore global recipes powered by TheMealDB API.

---

## 🎯 1. Project Introduction & Objectives

### Introduction
Foodie Hub is a client-side frontend web application built to bring culinary exploration and nutritional awareness together. It showcases how modern semantic HTML5, responsive CSS3, and vanilla JavaScript can power a rich, single-page application without unnecessary framework overhead.

### Core Objectives
- **Food Discovery:** Enable users to discover diverse authentic Indian regional dishes (North Indian, South Indian, Ayurvedic, Mughlai).
- **Recipe Exploration:** Provide access to thousands of worldwide recipes with ingredients, measurements, and cooking instructions via TheMealDB API.
- **Nutritional Awareness:** Display estimated nutritional metrics (Calories, Protein, Carbohydrates, Fats, Fibre) to help users make mindful eating decisions.
- **Interactive Filtering & Search:** Deliver instant client-side searching and filtering by category, high-protein content, or calorie limits.
- **Cart Management:** Provide a sliding shopping cart drawer with quantity adjustments, free delivery threshold calculation, and simulated checkout.

---

## ❗ 2. Problem Statement

With the overwhelming fragmentation of food platforms, recipe blogs, and delivery apps, users typically face several challenges:
1. **Scattered Information:** Finding authentic regional meals often requires searching multiple recipe blogs, while finding nutritional breakdowns requires separate fitness tracking apps.
2. **Lack of Macro Visibility:** Most traditional food ordering and discovery portals do not display clear macronutrient breakdowns (Protein, Carbs, Fats, Fibre).
3. **Complex Interfaces:** Many modern food platforms are overloaded with account creation gates, paywalls, and heavy third-party scripts.

Foodie Hub solves these problems by providing a unified, lightweight, client-side discovery hub with instant search, transparent estimated macros, and integrated recipe lookup—accessible immediately without mandatory registration.

---

## 🛠️ 3. Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure, accessible landmarks, modal dialogs, and SVG iconography. |
| **CSS3** | Modern styling, CSS variables, Flexbox, CSS Grid, animations, and media queries for responsive layouts. |
| **JavaScript (ES6+)** | Asynchronous data loading (`fetch`), DOM manipulation, event delegation, cart state management, and API integration. |
| **JSON** | Standalone structured local meal data catalogue (`meals.json`). |
| **TheMealDB REST API** | Free external REST API used for global recipe searches, category filters, and detailed instructions. |
| **Ionicons** | Clean, modern vector icons for UI navigation and status indicators. |
| **Google Fonts** | Professional web typography using *Plus Jakarta Sans* and *Playfair Display*. |
| **Git & GitHub** | Source code management, branching, and version control. |
| **Vercel** | Fast, reliable static web hosting and continuous deployment. |

---

## ✨ 4. Main Features & Modules

### 4.1 Curated Indian Meal Catalogue
- Displays 10 authentic regional Indian dishes with rich descriptions, estimated macros, and prices in Indian Rupees (₹ INR).
- Data loaded asynchronously from `meals.json` with a built-in fallback catalog ensuring reliable offline and local testing.

### 4.2 Estimated Nutritional Awareness
- Every meal displays transparent macronutrient metrics:
  - 🔥 **Calories** (kcal)
  - 💪 **Protein** (g)
  - 🌾 **Carbohydrates** (g)
  - 🥑 **Fats** (g)
  - 🌱 **Fibre** (g)
- Accompanied by a clear nutritional disclaimer clarifying that values are estimated for general awareness and do not constitute medical or qualified dietary advice.

### 4.3 Multi-Criteria Search & Filtering
- **Live Search:** Instant real-time filtering by dish name, description, region, or ingredients.
- **Regional Filters:** North Indian and South Indian filters.
- **Nutritional Filters:** High Protein (>20g) and Low Calorie (≤500kcal) options.
- **Dietary Filter:** Vegetarian and Vegan options.

### 4.4 Interactive Shopping Cart Drawer
- Slide-over sidebar showing active selections with item thumbnails, quantities, and line totals.
- Quantity increment, decrement, and item removal with automatic subtotal, delivery fee, and 5% GST calculations.
- Dynamic free express delivery progress bar (qualifies above ₹500).
- Demo checkout modal generating simulated order confirmation numbers.

### 4.5 TheMealDB Global Recipe Explorer
- Live integration with TheMealDB REST API (`v1/1`).
- Keyword search and category horizontal scroller (Chicken, Seafood, Vegetarian, Dessert, etc.).
- Modal popup presenting recipe thumbnail, categorized ingredients paired with measurements, complete instructions, and YouTube tutorial link.
- Graceful error states and friendly empty search messaging.

### 4.6 Culinary Recommendation Chatbot
- Floating interactive assistant offering instant meal suggestions.
- Operates in demo mode using a localized rule-based matching engine for macro and regional requests.
- Ready for optional live OpenAI GPT-4o API integration when a developer key is configured.

---

## ⚙️ 5. How the Website Works

1. **Document Readiness:** When `DOMContentLoaded` fires, `initApp()` binds event listeners, starts copyright year tracking, and initiates data loading.
2. **Catalog Fetching:** `loadMeals()` makes an asynchronous `fetch('./meals.json')` request. The returned JSON array is stored in memory (`MEALS_CATALOG`).
3. **Dynamic Rendering:** `renderMeals()` maps the loaded data into responsive HTML cards inside `#mealsCatalogGrid`.
4. **Filtering & Search:** User input immediately triggers `renderMeals()`, which filters the in-memory array using active filter tags and search queries.
5. **Cart Operations:** Adding dishes modifies the `cartState` array. `renderCart()` re-calculates pricing using pure numeric arithmetic and formats displays using `Intl.NumberFormat('en-IN')`.
6. **Recipe Exploration:** Searching the recipe explorer sends requests to `TheMealDB` REST endpoints via `JS/api.js`, rendering results with modal inspection capabilities.

---

## 🏛️ 6. System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  index.html • css/style.css • Google Fonts • Ionicons       │
└──────────────────────────────┬──────────────────────────────┘
                               │ User Events & DOM Updates
┌──────────────────────────────▼──────────────────────────────┐
│                  Application Logic Layer                    │
│  JS/script.js (UI Controller, Cart State, Search, Filter)   │
│  JS/api.js    (TheMealDB REST Client & Fallback Engine)     │
└──────────────────┬───────────────────────────┬──────────────┘
                   │ Local Fetch               │ HTTP REST
┌──────────────────▼──────────┐ ┌──────────────▼──────────────┐
│         Data Layer          │ │      External Service       │
│  meals.json (Local Catalog) │ │  TheMealDB Public API       │
└─────────────────────────────┘ └─────────────────────────────┘
```

---

## ⚠️ 7. Project Limitations

- **Frontend-Only Application:** The current release is strictly a client-side frontend project.
- **No Backend Server:** There is no server environment (such as Node.js/Express, Python/Django, or PHP) handling server-side logic.
- **No Database:** Data is stored statically in `meals.json` and in client memory; cart items do not persist across full browser resets.
- **No Real Authentication:** The platform does not feature user login, user accounts, password hashing, or session management.
- **No Real Payment Processing:** The shopping cart and checkout modal are frontend demonstrations; no actual financial transactions or order fulfillments take place.
- **No Dietitian Validation:** Nutritional values are estimated benchmarks for general informational purposes only and are not verified by licensed medical professionals or dietitians.

---

## 🔮 8. Future Enhancements

- **Backend Development:** Build a RESTful backend using Node.js and Express.js.
- **Persistent Database:** Integrate MongoDB or PostgreSQL to store catalog items, user profiles, and order histories.
- **Secure Authentication:** Add JWT-based user authentication or OAuth (Google Sign-In).
- **Payment Gateway:** Integrate Razorpay or Stripe for real INR transaction processing.
- **Personalized Nutrition Tracking:** Enable users to set custom daily calorie and macronutrient targets with persistent meal tracking.

---

## 🏁 9. Conclusion

Foodie Hub demonstrates that a modern, dynamic, and engaging web application can be built cleanly using core web standards. By combining structured local data with external REST API integration, it provides an intuitive platform for Indian culinary discovery, global recipe research, and estimated nutritional awareness.

---

## 📁 Project Structure

```text
Foodie-Hub/
│
├── index.html              # Main HTML5 landing page & application structure
├── README.md               # Comprehensive project documentation
├── content.md              # Detailed project specification & architecture report
├── meals.json              # Local Indian meal catalogue (JSON format)
├── manifest.webmanifest    # Web app manifest metadata
│
├── JS/
│   ├── script.js           # Core UI logic, cart state, filtering, chatbot
│   └── api.js              # TheMealDB API asynchronous service module
│
├── css/
│   └── style.css           # Complete styles, variables, grid, responsive queries
│
└── img/
    ├── favicon.png         # Browser favicon
    ├── apple-touch-icon.png
    ├── customers/          # Avatar portraits
    └── meals/              # High-quality dish imagery (meal-1 to meal-10)
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Ishant03-creative/Foodie-Hub.git
   ```
2. Open the project folder in **Visual Studio Code**.
3. Install the **Live Server** extension if not already installed.
4. Right-click `index.html` and choose **Open with Live Server**.
5. The website will launch at `http://127.0.0.1:5500/`.

---

## 📜 Nutrition Disclaimer

> **Notice:** The nutritional information displayed on Foodie Hub is estimated and provided for general informational purposes only. Actual values may vary depending on ingredients and preparation methods. This platform does not provide professional dietary or medical advice.
