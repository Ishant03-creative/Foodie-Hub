/**
 * =========================================================================
 * THEMEALDB API SERVICE MODULE (JS/api.js)
 * =========================================================================
 * Provides clean, reusable asynchronous functions to communicate with
 * TheMealDB public REST API (Free Developer API Key: "1").
 *
 * Base URL: https://www.themealdb.com/api/json/v1/1/
 * Documentation: https://www.themealdb.com/docs_api_guide.php
 *
 * Key Capabilities:
 *   1. searchMeals(query)            - Search recipes by keyword
 *   2. getMealDetails(mealId)        - Fetch full recipe details by meal ID
 *   3. getRandomMeal()               - Discover a random surprise recipe
 *   4. getMealCategories()           - List all available food categories
 *   5. filterMealsByCategory(cat)    - Filter recipes by specific category
 *   6. extractIngredients(meal)      - Dynamically pairs ingredients & measures
 * =========================================================================
 */

'use strict';

const MEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// In-memory cache to prevent redundant HTTP requests (UX optimization)
const apiCache = new Map();

/**
 * Curated authentic TheMealDB recipes for offline / CORS / file:// preview guarantee.
 * Ensures the Explore Recipes section renders beautifully even if external API access
 * is restricted, rate-limited, or blocked by local browser sandbox policies.
 */
const CURATED_RECIPES_FALLBACK = [
  {
    idMeal: "52772",
    strMeal: "Teriyaki Chicken Casserole",
    strCategory: "Chicken",
    strArea: "Japanese",
    strInstructions: "Preheat oven to 350° F. Spray a 9x13-inch baking dish with non-stick spray.\r\nCombine soy sauce, water, brown sugar, ginger, and garlic in a small saucepan and cover over medium heat. Whisk together cornstarch and 2 tablespoons of water in a small bowl until dissolved. Add to saucepan and bring to a boil; cook for 1 minute until thickened.\r\nPlace chicken breasts into the prepared baking dish. Pour 1 cup of sauce over chicken. Bake uncovered for 35 minutes.\r\nSteam stir-fry vegetables until tender-crisp. Serve hot over cooked brown rice with extra teriyaki sauce drizzled over the top.",
    strMealThumb: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    strYoutube: "https://www.youtube.com/watch?v=4aZr5hZXP_s",
    strIngredient1: "Soy Sauce", strMeasure1: "3/4 cup",
    strIngredient2: "Water", strMeasure2: "1/2 cup",
    strIngredient3: "Brown Sugar", strMeasure3: "1/4 cup",
    strIngredient4: "Ground Ginger", strMeasure4: "1/2 tsp",
    strIngredient5: "Minced Garlic", strMeasure5: "1/2 tsp",
    strIngredient6: "Cornstarch", strMeasure6: "2 tbsp",
    strIngredient7: "Chicken Breasts", strMeasure7: "2 sliced",
    strIngredient8: "Stir-fry Vegetables", strMeasure8: "1 bag",
    strIngredient9: "Brown Rice", strMeasure9: "3 cups cooked"
  },
  {
    idMeal: "52795",
    strMeal: "Chicken Handi",
    strCategory: "Chicken",
    strArea: "Indian",
    strInstructions: "Take a pan add oil, ginger garlic paste and chicken and cook until chicken turns white.\r\nAdd all whole spices and powder spices (turmeric, chili, garam masala, salt).\r\nCook for 5-7 minutes. Add whisked plain yogurt and tomatoes, cover and simmer on low heat for 15 minutes.\r\nFinish with fresh cream, kasuri methi and green chilies. Serve hot with warm naan or steamed basmati rice.",
    strMealThumb: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
    strYoutube: "https://www.youtube.com/watch?v=IO0issT0Rmc",
    strIngredient1: "Chicken", strMeasure1: "1.2 kg",
    strIngredient2: "Onion", strMeasure2: "2 chopped",
    strIngredient3: "Tomatoes", strMeasure3: "3 pureed",
    strIngredient4: "Garlic Paste", strMeasure4: "1 tbsp",
    strIngredient5: "Ginger Paste", strMeasure5: "1 tbsp",
    strIngredient6: "Yogurt", strMeasure6: "1 cup",
    strIngredient7: "Fresh Cream", strMeasure7: "1/2 cup",
    strIngredient8: "Garam Masala", strMeasure8: "1 tsp",
    strIngredient9: "Green Chilies", strMeasure9: "3 slit"
  },
  {
    idMeal: "52771",
    strMeal: "Spicy Arrabiata Penne",
    strCategory: "Vegetarian",
    strArea: "Italian",
    strInstructions: "Bring a large pot of salted water to a boil. Add penne rigate and cook until al dente, about 9 minutes.\r\nIn a wide skillet, heat extra virgin olive oil over medium-low heat. Add sliced garlic and crushed red chili flakes, sauteing for 1-2 minutes until fragrant but not browned.\r\nStir in crushed Italian San Marzano tomatoes and simmer for 15 minutes.\r\nToss drained penne directly into sauce with torn fresh basil leaves. Finish with freshly grated Parmigiano-Reggiano and serve immediately.",
    strMealThumb: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    strYoutube: "https://www.youtube.com/watch?v=1IszT_guI08",
    strIngredient1: "Penne Rigate", strMeasure1: "1 pound",
    strIngredient2: "Olive Oil", strMeasure2: "1/4 cup",
    strIngredient3: "Garlic", strMeasure3: "4 cloves sliced",
    strIngredient4: "Chopped Tomatoes", strMeasure4: "28 oz can",
    strIngredient5: "Red Pepper Flakes", strMeasure5: "1/2 tsp",
    strIngredient6: "Fresh Basil", strMeasure6: "6 leaves",
    strIngredient7: "Parmesan Cheese", strMeasure7: "Grated to taste"
  },
  {
    idMeal: "52959",
    strMeal: "Baked Salmon with Fennel & Tomatoes",
    strCategory: "Seafood",
    strArea: "British",
    strInstructions: "Heat oven to 200C/180C fan/gas 6. Put the sliced fennel and cherry tomatoes in a roasting tin, drizzle with half the olive oil, and roast for 15 minutes.\r\nPlace wild salmon fillets on top of vegetables, drizzle with remaining oil and lemon juice, and season with sea salt and cracked black pepper.\r\nBake for a further 12-15 minutes until salmon is flaky and opaque. Scatter with reserved fennel fronds and serve immediately.",
    strMealThumb: "https://www.themealdb.com/images/media/meals/1548772327.jpg",
    strYoutube: "https://www.youtube.com/watch?v=FjU_xHHpSkM",
    strIngredient1: "Salmon Fillets", strMeasure1: "4 steaks",
    strIngredient2: "Fennel", strMeasure2: "2 medium bulbs",
    strIngredient3: "Cherry Tomatoes", strMeasure3: "250g",
    strIngredient4: "Olive Oil", strMeasure4: "2 tbsp",
    strIngredient5: "Lemon", strMeasure5: "1 juice and zest"
  },
  {
    idMeal: "52785",
    strMeal: "Dal Fry (Lentil Curry)",
    strCategory: "Vegetarian",
    strArea: "Indian",
    strInstructions: "Wash and rinse toor dal thoroughly. Pressure cook with water, turmeric, and salt for 3-4 whistles until tender.\r\nHeat pure ghee in a pan. Add cumin seeds, mustard seeds, and pinch of asafoetida. When seeds crackle, add chopped onions, garlic, ginger and green chillies.\r\nSaute until golden, then add chopped tomatoes, coriander powder and garam masala. Cook until ghee separates.\r\nPour cooked dal into the tempering, mix thoroughly and simmer for 5 minutes. Garnish with chopped coriander leaves and a squeeze of fresh lemon.",
    strMealThumb: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
    strYoutube: "https://www.youtube.com/watch?v=J4D8HY56P4g",
    strIngredient1: "Toor Dal", strMeasure1: "1 cup",
    strIngredient2: "Pure Ghee", strMeasure2: "2 tbsp",
    strIngredient3: "Cumin Seeds", strMeasure3: "1 tsp",
    strIngredient4: "Mustard Seeds", strMeasure4: "1/2 tsp",
    strIngredient5: "Onion", strMeasure5: "1 large chopped",
    strIngredient6: "Tomatoes", strMeasure6: "2 chopped",
    strIngredient7: "Garlic", strMeasure7: "5 cloves minced",
    strIngredient8: "Fresh Coriander", strMeasure8: "Garnish"
  },
  {
    idMeal: "52844",
    strMeal: "Classic Italian Lasagne",
    strCategory: "Pasta",
    strArea: "Italian",
    strInstructions: "Heat oil in a large saucepan and gently brown minced meat with diced carrots, celery and onions.\r\nAdd tomato puree, crushed tomatoes and red wine. Simmer gently for 40 minutes to develop deep ragu flavor.\r\nIn a baking dish, layer meat sauce, fresh pasta sheets, and creamy bechamel sauce.\r\nRepeat layers and top generously with freshly grated mozzarella and parmesan.\r\nBake at 190°C for 30 minutes until golden and bubbling. Let rest 10 minutes before slicing.",
    strMealThumb: "https://www.themealdb.com/images/media/meals/wtsvxx1511296826.jpg",
    strYoutube: "https://www.youtube.com/watch?v=gfhfsBPt46s",
    strIngredient1: "Minced Beef", strMeasure1: "500g",
    strIngredient2: "Lasagne Sheets", strMeasure2: "12 sheets",
    strIngredient3: "Tomato Sauce", strMeasure3: "500ml",
    strIngredient4: "Mozzarella", strMeasure4: "200g",
    strIngredient5: "Parmesan", strMeasure5: "50g grated",
    strIngredient6: "Olive Oil", strMeasure6: "2 tbsp"
  },
  {
    idMeal: "52804",
    strMeal: "Canadian Poutine",
    strCategory: "Miscellaneous",
    strArea: "Canadian",
    strInstructions: "Cut russet potatoes into medium matchsticks and soak in cold water for 1 hour.\r\nDouble-fry potatoes: first at 325°F until tender but pale (4 minutes), drain and rest. Then fry at 375°F until golden brown and crispy (2 minutes).\r\nPrepare rich beef and chicken veloute gravy seasoned with black pepper.\r\nImmediately place piping hot fries in shallow bowls, scatter fresh white cheddar cheese curds over fries, and ladle steaming hot gravy over top so curds soften.",
    strMealThumb: "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg",
    strYoutube: "https://www.youtube.com/watch?v=UVAMAoA2_WU",
    strIngredient1: "Russet Potatoes", strMeasure1: "4 large",
    strIngredient2: "Cheese Curds", strMeasure2: "2 cups",
    strIngredient3: "Beef Gravy", strMeasure3: "2 cups hot",
    strIngredient4: "Frying Oil", strMeasure4: "For frying"
  },
  {
    idMeal: "52906",
    strMeal: "Flamiche Traditional Leek Tart",
    strCategory: "Vegetarian",
    strArea: "French",
    strInstructions: "Line a 23cm tart tin with rolled shortcrust pastry and chill for 20 minutes.\r\nMelt butter in a large pan and cook finely sliced leeks gently for 20 minutes until meltingly soft without browning.\r\nBeat eggs with double cream, freshly grated nutmeg, sea salt and white pepper.\r\nSpread softened leeks into pastry case, pour egg mixture over, and bake at 190°C for 25-30 minutes until golden and just set. Serve warm.",
    strMealThumb: "https://www.themealdb.com/images/media/meals/tsryrx1511289095.jpg",
    strYoutube: "https://www.youtube.com/watch?v=vT0q5c880Rg",
    strIngredient1: "Shortcrust Pastry", strMeasure1: "300g",
    strIngredient2: "Fresh Leeks", strMeasure2: "4 large sliced",
    strIngredient3: "Butter", strMeasure3: "50g",
    strIngredient4: "Eggs", strMeasure4: "3 free range",
    strIngredient5: "Double Cream", strMeasure5: "150ml",
    strIngredient6: "Nutmeg", strMeasure6: "Pinch grated"
  }
];

const DEFAULT_CATEGORIES_FALLBACK = [
  { idCategory: "1", strCategory: "Chicken" },
  { idCategory: "2", strCategory: "Vegetarian" },
  { idCategory: "3", strCategory: "Seafood" },
  { idCategory: "4", strCategory: "Pasta" },
  { idCategory: "5", strCategory: "Beef" },
  { idCategory: "6", strCategory: "Dessert" },
  { idCategory: "7", strCategory: "Miscellaneous" }
];

/**
 * Internal generic helper to perform fetch requests with error and status checking.
 */
async function fetchMealDb(endpoint, useCache = true) {
  const url = `${MEALDB_BASE_URL}/${endpoint}`;

  if (useCache && apiCache.has(url)) {
    return apiCache.get(url);
  }

  // 5-second timeout so requests fail fast if blocked or offline
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), 5000) : null;

  try {
    const fetchOptions = controller ? { signal: controller.signal } : {};
    const response = await fetch(url, fetchOptions);
    if (timeoutId) clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (useCache && data) {
      apiCache.set(url, data);
    }

    return data;
  } catch (error) {
    if (timeoutId) clearTimeout(timeoutId);
    console.warn(`[TheMealDB Network Note] Request to "${url}" encountered:`, error.message);
    throw error;
  }
}

/**
 * Search for meals by name or keyword.
 * Endpoint: search.php?s={query}
 */
async function searchMeals(query) {
  const cleanQuery = (query || "").trim().toLowerCase();

  try {
    const data = await fetchMealDb(`search.php?s=${encodeURIComponent(cleanQuery)}`, true);
    if (data && Array.isArray(data.meals) && data.meals.length > 0) {
      return data.meals;
    }
    // If API returned null (no meals found)
    if (cleanQuery !== "") {
      return [];
    }
  } catch (err) {
    console.warn("TheMealDB network request failed, filtering curated recipe collection:", err.message);
  }

  // Graceful fallback from curated database so recipes ALWAYS display
  if (!cleanQuery) {
    return CURATED_RECIPES_FALLBACK;
  }

  return CURATED_RECIPES_FALLBACK.filter((m) =>
    m.strMeal.toLowerCase().includes(cleanQuery) ||
    (m.strCategory && m.strCategory.toLowerCase().includes(cleanQuery)) ||
    (m.strArea && m.strArea.toLowerCase().includes(cleanQuery))
  );
}

/**
 * Fetch full recipe details for a specific meal by its unique ID.
 * Endpoint: lookup.php?i={mealId}
 */
async function getMealDetails(mealId) {
  if (!mealId) return null;
  const cleanId = String(mealId).trim();

  try {
    const data = await fetchMealDb(`lookup.php?i=${encodeURIComponent(cleanId)}`, true);
    if (data && Array.isArray(data.meals) && data.meals.length > 0) {
      return data.meals[0];
    }
  } catch (err) {
    console.warn("TheMealDB lookup failed, checking curated recipe collection:", err.message);
  }

  // Match from curated fallback
  const fallback = CURATED_RECIPES_FALLBACK.find((m) => String(m.idMeal) === cleanId);
  return fallback || null;
}

/**
 * Fetch a single random meal from TheMealDB.
 * Endpoint: random.php
 */
async function getRandomMeal() {
  try {
    const data = await fetchMealDb('random.php', false);
    if (data && Array.isArray(data.meals) && data.meals.length > 0) {
      return data.meals[0];
    }
  } catch (err) {
    console.warn("TheMealDB random.php failed, choosing random from curated collection:", err.message);
  }

  const randomIndex = Math.floor(Math.random() * CURATED_RECIPES_FALLBACK.length);
  return CURATED_RECIPES_FALLBACK[randomIndex];
}

/**
 * Fetch the complete list of recipe categories from TheMealDB.
 * Endpoint: categories.php
 */
async function getMealCategories() {
  try {
    const data = await fetchMealDb('categories.php', true);
    if (data && Array.isArray(data.categories) && data.categories.length > 0) {
      return data.categories;
    }
  } catch (err) {
    console.warn("TheMealDB categories.php failed, using default categories:", err.message);
  }

  return DEFAULT_CATEGORIES_FALLBACK;
}

/**
 * Filter and fetch meals belonging to a specific category.
 * Endpoint: filter.php?c={category}
 */
async function filterMealsByCategory(category) {
  if (!category || category === 'All') {
    return searchMeals('Chicken');
  }

  const cleanCategory = String(category).trim();

  try {
    const data = await fetchMealDb(`filter.php?c=${encodeURIComponent(cleanCategory)}`, true);
    if (data && Array.isArray(data.meals) && data.meals.length > 0) {
      return data.meals;
    }
  } catch (err) {
    console.warn(`TheMealDB filter.php?c=${cleanCategory} failed, using curated fallback:`, err.message);
  }

  // Filter curated collection
  const matched = CURATED_RECIPES_FALLBACK.filter(
    (m) => m.strCategory && m.strCategory.toLowerCase() === cleanCategory.toLowerCase()
  );

  return matched.length > 0 ? matched : CURATED_RECIPES_FALLBACK;
}

/**
 * Dynamically extracts non-empty ingredients and measurements
 * from a TheMealDB meal object (strIngredient1..20 and strMeasure1..20).
 */
function extractIngredients(meal) {
  const list = [];
  if (!meal || typeof meal !== 'object') return list;

  for (let i = 1; i <= 20; i++) {
    const rawIngredient = meal[`strIngredient${i}`];
    const rawMeasure = meal[`strMeasure${i}`];

    if (rawIngredient && typeof rawIngredient === 'string') {
      const ingredient = rawIngredient.trim();
      const measure = rawMeasure && typeof rawMeasure === 'string' ? rawMeasure.trim() : '';

      if (ingredient !== '' && ingredient.toLowerCase() !== 'null') {
        list.push({
          name: ingredient,
          measure: measure
        });
      }
    }
  }

  return list;
}

// Expose API functions globally on window.MealDbAPI and individual identifiers
var MealDbAPI = {
  searchMeals,
  getMealDetails,
  getRandomMeal,
  getMealCategories,
  filterMealsByCategory,
  extractIngredients
};

if (typeof window !== 'undefined') {
  window.MealDbAPI = MealDbAPI;
  window.searchMeals = searchMeals;
  window.getMealDetails = getMealDetails;
  window.getRandomMeal = getRandomMeal;
  window.getMealCategories = getMealCategories;
  window.filterMealsByCategory = filterMealsByCategory;
  window.extractIngredients = extractIngredients;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MealDbAPI;
}
