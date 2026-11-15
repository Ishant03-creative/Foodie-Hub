
'use strict';

/**
 * =========================================================================
 * 1. GLOBAL CONFIGURATION & API KEYS
 * =========================================================================
 * Optional OpenAI API Key for live ChatGPT chatbot interactions.
 * If empty or undefined, the assistant operates seamlessly in demo mode
 * using its built-in clinical dietitian rules engine.
 */
const OPENAI_API_KEY = "";

/**
 * Consistent Indian Rupee (INR) Currency Formatter
 * Uses JavaScript's Intl.NumberFormat with 'en-IN' locale for standard Indian currency presentation.
 */
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

function formatINR(amount) {
  return inrFormatter.format(amount || 0);
}

/**
 * Guaranteed fallback catalog matching meals.json.
 * Used when running via file:// protocol where browsers restrict relative fetch requests.
 */
const FALLBACK_MEALS_CATALOG = [
  {
    id: "paneer-tikka-masala",
    name: "Paneer Tikka Masala",
    category: ["north-indian", "vegetarian", "high-protein", "dietitian-pick"],
    region: "North Indian",
    price: 320,
    calories: 480,
    protein: 24,
    carbs: 22,
    fats: 32,
    fiber: 6,
    image: "img/meals/meal-1.jpg",
    dietitianApproved: true,
    description: "Char-grilled cottage cheese cubes simmered in a spiced tomato-fenugreek gravy infused with crushed coriander seeds and fresh ginger.",
    dietitianNotes: "Rich in slow-digesting casein protein and conjugated linoleic acid (CLA), paired with lycopene from slow-cooked tomatoes."
  },
  {
    id: "chana-masala",
    name: "High-Protein Chana Masala",
    category: ["north-indian", "vegan", "high-protein", "low-calorie", "dietitian-pick"],
    region: "North Indian",
    price: 260,
    calories: 420,
    protein: 22,
    carbs: 58,
    fats: 12,
    fiber: 16,
    image: "img/meals/meal-2.jpg",
    dietitianApproved: true,
    description: "Slow-simmered organic Kabuli chickpeas cooked in an aromatic roasted cumin, amchur (dry mango), and ginger reduction.",
    dietitianNotes: "Outstanding 16g prebiotic dietary fiber profile that regulates blood glucose spikes and feeds beneficial gut Bifidobacteria."
  },
  {
    id: "palak-paneer",
    name: "Palak Paneer (Supergreens)",
    category: ["north-indian", "vegetarian", "keto", "low-calorie", "dietitian-pick"],
    region: "North Indian",
    price: 290,
    calories: 410,
    protein: 20,
    carbs: 14,
    fats: 30,
    fiber: 8,
    image: "img/meals/meal-3.jpg",
    dietitianApproved: true,
    description: "Fresh tender spinach blanched and pureed with garlic, green chilies, and cold-pressed mustard oil, folded around soft artisanal paneer.",
    dietitianNotes: "Keto-friendly with high bioavailable non-heme iron, lutein, and magnesium to support cardiovascular health."
  },
  {
    id: "masala-dosa",
    name: "Crispy Masala Dosa with Sambar",
    category: ["south-indian", "vegan", "low-calorie", "dietitian-pick"],
    region: "South Indian",
    price: 220,
    calories: 380,
    protein: 12,
    carbs: 62,
    fats: 10,
    fiber: 9,
    image: "img/meals/meal-4.jpg",
    dietitianApproved: true,
    description: "Stone-ground fermented rice and urad dal crepe stuffed with spiced mustard-seed potatoes, served with drumstick sambar and fresh coconut chutney.",
    dietitianNotes: "Naturally fermented for 18 hours, providing live probiotics that enhance gut enzymatic efficiency and micronutrient absorption."
  },
  {
    id: "kerala-fish-curry",
    name: "Kerala Coconut Fish Curry",
    category: ["south-indian", "pescatarian", "high-protein", "dietitian-pick"],
    region: "South Indian",
    price: 380,
    calories: 460,
    protein: 38,
    carbs: 12,
    fats: 28,
    fiber: 5,
    image: "img/meals/meal-5.jpg",
    dietitianApproved: true,
    description: "Wild-caught kingfish steak gently simmered in fresh coconut milk, Kudampuli (Malabar tamarind), fresh curry leaves, and green chilies.",
    dietitianNotes: "Superb source of Omega-3 EPA/DHA fatty acids and medium-chain triglycerides (MCTs) for cognitive and metabolic support."
  },
  {
    id: "chicken-biryani",
    name: "Hyderabadi Dum Chicken Biryani",
    category: ["south-indian", "high-protein"],
    region: "South Indian",
    price: 390,
    calories: 590,
    protein: 42,
    carbs: 64,
    fats: 18,
    fiber: 6,
    image: "img/meals/meal-6.jpg",
    dietitianApproved: true,
    description: "Long-grain aged basmati rice layered with yogurt-marinated tender chicken, saffron threads, and mint, sealed and steamed in earthenware.",
    dietitianNotes: "Balanced complete animal protein combined with thermogenic warming spices including green cardamom, cinnamon, and whole cloves."
  },
  {
    id: "dal-makhani",
    name: "Slow-Cooked Dal Makhani",
    category: ["north-indian", "vegetarian", "high-protein"],
    region: "North Indian",
    price: 270,
    calories: 440,
    protein: 19,
    carbs: 52,
    fats: 18,
    fiber: 14,
    image: "img/meals/meal-7.jpg",
    dietitianApproved: true,
    description: "Whole black urad lentils and red kidney beans simmered overnight for 16 hours over slow embers, finished with churned butter and kasuri methi.",
    dietitianNotes: "Rich in complex resistant starches that fuel short-chain fatty acid (SCFA) production in the human colon."
  },
  {
    id: "tandoori-soya-chaap",
    name: "Tandoori Soya Chaap Power Bowl",
    category: ["north-indian", "vegetarian", "high-protein", "dietitian-pick"],
    region: "North Indian",
    price: 310,
    calories: 470,
    protein: 40,
    carbs: 26,
    fats: 16,
    fiber: 11,
    image: "img/meals/meal-8.jpg",
    dietitianApproved: true,
    description: "High-protein soy protein ribbons marinated in Greek yogurt, Kashmiri deghi mirch, and roasted carom seeds, clay-oven roasted to perfection.",
    dietitianNotes: "An ultra-high-protein plant-based power bowl delivering 40g of complete amino acids for athletic lean muscle synthesis."
  },
  {
    id: "moong-dal-khichdi",
    name: "Moong Dal Khichdi & Spiced Kadhi",
    category: ["north-indian", "vegetarian", "low-calorie", "dietitian-pick"],
    region: "Ayurvedic / Comfort",
    price: 210,
    calories: 360,
    protein: 16,
    carbs: 56,
    fats: 8,
    fiber: 10,
    image: "img/meals/meal-9.jpg",
    dietitianApproved: true,
    description: "Split yellow moong dal and whole-grain rice tempered with pure A2 ghee, cumin, and hing, served with probiotic turmeric yogurt kadhi.",
    dietitianNotes: "Ayurvedic gut-healing benchmark: hypoallergenic, gentle on digestive tracts, and anti-inflammatory."
  },
  {
    id: "baingan-bharta",
    name: "Smoked Baingan Bharta & Phulka",
    category: ["north-indian", "vegan", "low-calorie"],
    region: "North Indian",
    price: 240,
    calories: 320,
    protein: 10,
    carbs: 38,
    fats: 14,
    fiber: 12,
    image: "img/meals/meal-10.jpg",
    dietitianApproved: true,
    description: "Fire-roasted whole eggplant charred on open flame, mashed and sauteed with sweet onions, heirloom tomatoes, ginger, and green peas.",
    dietitianNotes: "Super-low calorie density with rich nasunin antioxidant content found in deep-purple eggplant skins."
  }
];

let MEALS_CATALOG = [];
let isMealsLoaded = false;

/**
 * Asynchronously loads meal catalog data from './meals.json' using the Fetch API.
 * 
 * Flow:
 * 1. fetch("./meals.json") initiates an asynchronous HTTP GET request to retrieve the JSON file.
 * 2. response.ok checks if the HTTP status code is successful (200-299). If not, an Error is thrown.
 * 3. response.json() asynchronously parses the JSON response body into a native JavaScript array.
 * 4. The parsed array is assigned to MEALS_CATALOG.
 * 5. On file:// protocol or offline, gracefully falls back to FALLBACK_MEALS_CATALOG so recipes always display.
 * 6. isMealsLoaded is set to true.
 * 7. renderMeals() is called to render the meal catalog onto the page only after the data has loaded.
 * 8. renderCart() is called so initial and active cart items resolve their verified data.
 */
async function loadMeals() {
  try {
    const response = await fetch("./meals.json");
    if (!response.ok) {
      throw new Error(`HTTP error while fetching meals.json: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      MEALS_CATALOG = data;
    } else {
      MEALS_CATALOG = FALLBACK_MEALS_CATALOG;
    }
  } catch (error) {
    console.warn("Notice: fetch('./meals.json') encountered local/network restriction:", error.message);
    // Graceful fallback: render guaranteed local catalog so recipes never fail to display
    MEALS_CATALOG = FALLBACK_MEALS_CATALOG;
  } finally {
    isMealsLoaded = true;
    // Render meal cards and cart only after data is safely loaded
    renderMeals();
    renderCart();
  }
}

// =========================================================================
// 3. APPLICATION STATE
// =========================================================================
// Initialize cart with sample items (matching the "2" on reference image cart icon)
let cartState = [
  { id: "paneer-tikka-masala", quantity: 1 },
  { id: "masala-dosa", quantity: 1 }
];

let activeFilter = "all";
let activeSearchQuery = "";

// =========================================================================
// 4. DOM ELEMENTS
// =========================================================================
// Navbar & Controls
const navSearchInput = document.getElementById("menuSearchInput");
const btnCartTrigger = document.getElementById("btnCartTrigger");
const cartBadge = document.getElementById("cartBadge");
const btnMobileNav = document.getElementById("btnMobileNav");
const navLinksWrap = document.getElementById("navLinksWrap");

// Menu & Catalog
const mealsCatalogGrid = document.getElementById("mealsCatalogGrid");
const filterButtons = document.querySelectorAll(".btn-filter");
const menuResultsCount = document.getElementById("menuResultsCount");
const btnClearFilters = document.getElementById("btnClearFilters");

// Cart Sidebar
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const btnCloseCart = document.getElementById("btnCloseCart");
const cartItemsList = document.getElementById("cartItemsList");
const cartEmptyState = document.getElementById("cartEmptyState");
const cartFooter = document.getElementById("cartFooter");
const cartCountHeader = document.getElementById("cartCountHeader");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartDelivery = document.getElementById("cartDelivery");
const cartTax = document.getElementById("cartTax");
const cartTotal = document.getElementById("cartTotal");
const shippingMsg = document.getElementById("shippingMsg");
const shippingProgressFill = document.getElementById("shippingProgressFill");
const btnCheckout = document.getElementById("btnCheckout");
const btnExploreFromCart = document.getElementById("btnExploreFromCart");

// Modals
const checkoutSuccessModal = document.getElementById("checkoutSuccessModal");
const btnDoneCheckout = document.getElementById("btnDoneCheckout");
const orderIdDisplay = document.getElementById("orderIdDisplay");

// Hero Actions
const btnHeroOrder = document.getElementById("btnHeroOrder");

// Contact Form
const contactForm = document.getElementById("contactForm");
const contactSuccessBanner = document.getElementById("contactSuccessBanner");

// AI Chatbot Widget
const btnAiChatLauncher = document.getElementById("btnAiChatLauncher");
const aiChatWindow = document.getElementById("aiChatWindow");
const btnCloseChatWidget = document.getElementById("btnCloseChatWidget");
const btnClearChatHistory = document.getElementById("btnClearChatHistory");
const chatMessagesContainer = document.getElementById("chatMessagesContainer");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const aiModeIndicator = document.getElementById("aiModeIndicator");

// =========================================================================
// 5. INITIALIZATION
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

async function initApp() {
  updateCopyrightYear();
  setupEventListeners();
  checkAiMode();
  await loadMeals();
  initExploreRecipes();
}

function updateCopyrightYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function checkAiMode() {
  if (!aiModeIndicator) return;
  if (OPENAI_API_KEY && OPENAI_API_KEY.trim() !== "") {
    aiModeIndicator.textContent = "Live GPT-4o Mode";
    aiModeIndicator.classList.add("mode-live");
  } else {
    aiModeIndicator.textContent = "Demo Mode (Local Engine)";
    aiModeIndicator.classList.remove("mode-live");
  }
}

// =========================================================================
// 6. MENU RENDERING & FILTERING
// =========================================================================
function renderMeals() {
  if (!mealsCatalogGrid) return;

  // Show placeholder indicator while meals.json is loading
  if (!isMealsLoaded && MEALS_CATALOG.length === 0) {
    mealsCatalogGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 5rem 2rem;">
        <ion-icon name="sync-outline" style="font-size: 3.6rem; color: #71933e; margin-bottom: 1.2rem;"></ion-icon>
        <p style="font-size: 1.6rem; color: #55674c;">Loading dietitian-verified Indian menu...</p>
      </div>
    `;
    return;
  }

  const filteredMeals = MEALS_CATALOG.filter((meal) => {
    // Category & Regional check
    let matchesCategory = true;
    if (activeFilter === "high-protein") {
      matchesCategory = meal.protein >= 20;
    } else if (activeFilter === "low-calorie") {
      matchesCategory = meal.calories <= 500;
    } else if (activeFilter === "north-indian") {
      matchesCategory = meal.category.includes("north-indian");
    } else if (activeFilter === "south-indian") {
      matchesCategory = meal.category.includes("south-indian");
    } else if (activeFilter === "vegetarian") {
      matchesCategory = meal.category.includes("vegetarian") || meal.category.includes("vegan");
    } else if (activeFilter === "dietitian-pick") {
      matchesCategory = meal.dietitianApproved === true;
    } else if (activeFilter !== "all") {
      matchesCategory = meal.category.includes(activeFilter);
    }

    // Search query check
    let matchesSearch = true;
    if (activeSearchQuery.trim() !== "") {
      const q = activeSearchQuery.toLowerCase();
      matchesSearch =
        meal.name.toLowerCase().includes(q) ||
        meal.description.toLowerCase().includes(q) ||
        meal.category.some((c) => c.toLowerCase().includes(q)) ||
        (meal.region && meal.region.toLowerCase().includes(q));
    }

    return matchesCategory && matchesSearch;
  });

  // Update Status Text
  if (menuResultsCount) {
    if (activeSearchQuery || activeFilter !== "all") {
      const filterLabel = activeFilter !== 'all' ? activeFilter.replace("-", " ") : activeSearchQuery;
      menuResultsCount.textContent = `Showing ${filteredMeals.length} Indian dish${filteredMeals.length === 1 ? "" : "es"} for "${filterLabel}"`;
      if (btnClearFilters) btnClearFilters.classList.remove("hidden");
    } else {
      menuResultsCount.textContent = `Showing all ${filteredMeals.length} dietitian-verified Indian dishes`;
      if (btnClearFilters) btnClearFilters.classList.add("hidden");
    }
  }

  // Handle Empty State
  if (filteredMeals.length === 0) {
    mealsCatalogGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 5rem 2rem;">
        <ion-icon name="search-outline" style="font-size: 4.8rem; color: #71933e; margin-bottom: 1.2rem;"></ion-icon>
        <h3 style="font-size: 2.2rem; color: #1f2d16; margin-bottom: 0.8rem;">No dishes match your criteria</h3>
        <p style="font-size: 1.5rem; color: #55674c; margin-bottom: 2rem;">Try adjusting your macro or regional filter, or ask our Foodie Hub AI Assistant to recommend a dish!</p>
        <button class="btn-filter active" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  // Generate HTML for Cards
  mealsCatalogGrid.innerHTML = filteredMeals
    .map((meal) => {
      const primaryCategory = meal.category[0] || "north-indian";
      const displayCategory = primaryCategory.replace("-", " ");
      return `
        <article class="meal-catalog-card" data-id="${meal.id}">
          <div class="card-media-box">
            <img src="${meal.image}" alt="${meal.name}" loading="lazy" />
            <div class="card-badges-top">
              <span class="badge-diet-tag badge-diet-tag--${primaryCategory}">${displayCategory}</span>
              ${meal.dietitianApproved ? '<span class="badge-dietitian-trust"><ion-icon name="shield-checkmark"></ion-icon> Dietitian Approved</span>' : ''}
            </div>
          </div>
          <div class="card-content-wrap">
            <div class="card-title-row">
              <h3 class="card-dish-name">${meal.name}</h3>
              <span class="card-dish-price">${formatINR(meal.price)}</span>
            </div>
            <p class="card-dish-desc">${meal.description}</p>
            
            <!-- Verified Nutritional Breakdown (Calories, Protein, Carbs, Fats, Fiber) -->
            <div class="card-macros-grid">
              <div class="macro-box">
                <span class="val" style="color: var(--badge-calories);">${meal.calories}</span>
                <span class="lbl">Calories</span>
              </div>
              <div class="macro-box">
                <span class="val" style="color: var(--badge-protein);">${meal.protein}g</span>
                <span class="lbl">Protein</span>
              </div>
              <div class="macro-box">
                <span class="val" style="color: #4263eb;">${meal.carbs}g</span>
                <span class="lbl">Carbs</span>
              </div>
              <div class="macro-box">
                <span class="val" style="color: var(--badge-fats);">${meal.fats}g</span>
                <span class="lbl">Fats</span>
              </div>
              <div class="macro-box">
                <span class="val" style="color: var(--badge-fiber);">${meal.fiber}g</span>
                <span class="lbl">Fiber</span>
              </div>
            </div>

            <button class="btn-card-add-cart" data-id="${meal.id}" aria-label="Add ${meal.name} to cart">
              <ion-icon name="cart-outline"></ion-icon>
              <span>Add to Fresh Cart</span>
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  // Attach Add to Cart listener on rendered buttons
  mealsCatalogGrid.querySelectorAll(".btn-card-add-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      addToCart(id);
    });
  });
}

function resetFilters() {
  activeFilter = "all";
  activeSearchQuery = "";
  if (navSearchInput) navSearchInput.value = "";

  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-filter") === "all");
  });

  renderMeals();
}

// =========================================================================
// 7. SHOPPING CART FUNCTIONALITY
// =========================================================================
function renderCart() {
  // If meals.json is not yet loaded, wait until loadMeals() finishes
  if (!isMealsLoaded && MEALS_CATALOG.length === 0) {
    return;
  }

  const totalItemCount = cartState.reduce((sum, item) => sum + item.quantity, 0);

  // Update Badges
  if (cartBadge) cartBadge.textContent = totalItemCount;
  if (cartCountHeader) cartCountHeader.textContent = totalItemCount;

  // Toggle Empty State
  if (totalItemCount === 0) {
    if (cartItemsList) cartItemsList.innerHTML = "";
    if (cartEmptyState) cartEmptyState.classList.remove("hidden");
    if (cartFooter) cartFooter.classList.add("hidden");
    return;
  }

  if (cartEmptyState) cartEmptyState.classList.add("hidden");
  if (cartFooter) cartFooter.classList.remove("hidden");

  let subtotal = 0;

  if (cartItemsList) {
    cartItemsList.innerHTML = cartState
      .map((cartItem) => {
        const meal = MEALS_CATALOG.find((m) => m.id === cartItem.id);
        if (!meal) return "";

        const lineTotal = meal.price * cartItem.quantity;
        subtotal += lineTotal;

        return `
          <div class="cart-item-row" data-id="${meal.id}">
            <img src="${meal.image}" alt="${meal.name}" class="cart-item-thumb" />
            <div class="cart-item-details">
              <h4 class="cart-item-title">${meal.name}</h4>
              <span class="cart-item-unit-price">${formatINR(meal.price)}</span>
              <div class="cart-qty-controls">
                <button class="btn-qty btn-qty-minus" data-id="${meal.id}" aria-label="Decrease quantity">&minus;</button>
                <span class="cart-qty-val">${cartItem.quantity}</span>
                <button class="btn-qty btn-qty-plus" data-id="${meal.id}" aria-label="Increase quantity">&#43;</button>
              </div>
            </div>
            <div class="cart-item-actions">
              <span class="cart-item-total">${formatINR(lineTotal)}</span>
              <button class="btn-remove-item" data-id="${meal.id}" title="Remove item" aria-label="Remove ${meal.name}">
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // Calculate totals (sensible Indian thresholds: ₹500 for free express delivery, ₹50 standard fee, 5% GST)
  const freeShippingThreshold = 500;
  const isFreeDelivery = subtotal >= freeShippingThreshold;
  const deliveryFee = isFreeDelivery ? 0 : 50;
  const estimatedTax = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + deliveryFee + estimatedTax;

  if (cartSubtotal) cartSubtotal.textContent = formatINR(subtotal);
  if (cartDelivery) cartDelivery.textContent = isFreeDelivery ? "FREE" : formatINR(deliveryFee);
  if (cartTax) cartTax.textContent = formatINR(estimatedTax);
  if (cartTotal) cartTotal.textContent = formatINR(grandTotal);

  // Shipping Progress Bar
  if (shippingMsg && shippingProgressFill) {
    if (isFreeDelivery) {
      shippingMsg.innerHTML = "🎉 <strong>Congratulations!</strong> You unlocked Free Express Delivery!";
      shippingProgressFill.style.width = "100%";
      shippingProgressFill.style.backgroundColor = "#2b8a3e";
    } else {
      const remaining = freeShippingThreshold - subtotal;
      const pct = Math.min(100, Math.max(10, (subtotal / freeShippingThreshold) * 100));
      shippingMsg.textContent = `Add ${formatINR(remaining)} more for Free Express Delivery!`;
      shippingProgressFill.style.width = `${pct}%`;
      shippingProgressFill.style.backgroundColor = "var(--color-primary)";
    }
  }

  attachCartItemListeners();
}

function attachCartItemListeners() {
  if (!cartItemsList) return;

  // Increment
  cartItemsList.querySelectorAll(".btn-qty-plus").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      updateCartItemQuantity(id, 1);
    });
  });

  // Decrement
  cartItemsList.querySelectorAll(".btn-qty-minus").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      updateCartItemQuantity(id, -1);
    });
  });

  // Remove
  cartItemsList.querySelectorAll(".btn-remove-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      removeFromCart(id);
    });
  });
}

function addToCart(dishId) {
  const item = cartState.find((i) => i.id === dishId);
  if (item) {
    item.quantity += 1;
  } else {
    cartState.push({ id: dishId, quantity: 1 });
  }

  renderCart();
  openCartDrawer();
  animateCartBadge();
}

function updateCartItemQuantity(dishId, change) {
  const itemIndex = cartState.findIndex((i) => i.id === dishId);
  if (itemIndex > -1) {
    cartState[itemIndex].quantity += change;
    if (cartState[itemIndex].quantity <= 0) {
      cartState.splice(itemIndex, 1);
    }
  }
  renderCart();
}

function removeFromCart(dishId) {
  cartState = cartState.filter((i) => i.id !== dishId);
  renderCart();
}

function openCartDrawer() {
  const sidebar = cartSidebar || document.getElementById("cartSidebar");
  const overlay = cartOverlay || document.getElementById("cartOverlay");
  if (sidebar && overlay) {
    sidebar.classList.add("active", "open");
    overlay.classList.add("active", "open");
    document.body.style.overflow = "hidden";
  }
}

function closeCartDrawer() {
  const sidebar = cartSidebar || document.getElementById("cartSidebar");
  const overlay = cartOverlay || document.getElementById("cartOverlay");
  if (sidebar && overlay) {
    sidebar.classList.remove("active", "open");
    overlay.classList.remove("active", "open");
    document.body.style.overflow = "";
  }
}

function animateCartBadge() {
  if (!cartBadge) return;
  cartBadge.classList.add("badge-pop");
  setTimeout(() => {
    cartBadge.classList.remove("badge-pop");
  }, 400);
}

// =========================================================================
// 8. AI FOOD RECOMMENDATION ASSISTANT (CHAT WIDGET & ENGINE)
// =========================================================================
function openAiChat() {
  if (aiChatWindow) {
    aiChatWindow.classList.remove("hidden");
    if (chatInput) chatInput.focus();
  }
}

function closeAiChat() {
  if (aiChatWindow) {
    aiChatWindow.classList.add("hidden");
  }
}

async function handleChatSubmission(e) {
  if (e) e.preventDefault();
  if (!chatInput) return;

  const rawMessage = chatInput.value.trim();
  if (!rawMessage) return;

  // Append user bubble
  appendChatMessage("user", rawMessage);
  chatInput.value = "";

  // Show typing indicator
  const typingIndicatorId = showTypingIndicator();

  try {
    if (OPENAI_API_KEY && OPENAI_API_KEY.trim() !== "") {
      // Live OpenAI REST API Call
      const aiReply = await callOpenAiAPI(rawMessage);
      removeTypingIndicator(typingIndicatorId);
      processAiResponse(aiReply);
    } else {
      // Local Intelligent Matcher (Demo Mode)
      setTimeout(() => {
        removeTypingIndicator(typingIndicatorId);
        const demoResult = runLocalIntelligentMatcher(rawMessage);
        appendChatMessage("bot", demoResult.text, demoResult.recommendedMeal);
      }, 700);
    }
  } catch (error) {
    console.warn("OpenAI API call error, falling back to Demo Mode:", error);
    removeTypingIndicator(typingIndicatorId);
    const fallbackResult = runLocalIntelligentMatcher(rawMessage);
    appendChatMessage(
      "bot",
      `*(Demo Mode Fallback)* ${fallbackResult.text}`,
      fallbackResult.recommendedMeal
    );
  }
}

// Real OpenAI REST API Implementation
async function callOpenAiAPI(userPrompt) {
  const catalogContext = JSON.stringify(
    MEALS_CATALOG.map((m) => ({
      id: m.id,
      name: m.name,
      region: m.region,
      calories: m.calories,
      protein: m.protein,
      carbs: m.carbs,
      fats: m.fats,
      fiber: m.fiber,
      dietitianApproved: m.dietitianApproved,
      description: m.description,
      dietitianNotes: m.dietitianNotes
    }))
  );

  const systemPrompt = `You are Foodie Hub AI, an intelligent clinical dietitian assistant specializing in authentic Indian cuisine and precision macro nutrition.
Here is our verified Indian meal catalog:
${catalogContext}

Your instructions:
1. Recommend the most appropriate dish from our catalog based on the user's dietary preferences, calorie limits, or macro goals (e.g. high protein, low calorie, North Indian, South Indian, keto, vegan).
2. Provide a 2-3 sentence clinical explanation of why this dish fits their metabolic goals.
3. At the very end of your response, output on its own line: "[RECOMMEND_ID: <meal-id>]" where <meal-id> is the matching dish ID.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 300
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "OpenAI API request failed");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

function processAiResponse(rawAiContent) {
  let recommendedMeal = null;
  const match = rawAiContent.match(/\[RECOMMEND_ID:\s*([a-zA-Z0-9_-]+)\]/i);

  let cleanText = rawAiContent;
  if (match) {
    const matchedId = match[1];
    recommendedMeal = MEALS_CATALOG.find((m) => m.id === matchedId);
    cleanText = rawAiContent.replace(/\[RECOMMEND_ID:\s*[a-zA-Z0-9_-]+\]/i, "").trim();
  }

  appendChatMessage("bot", cleanText, recommendedMeal);
}

// Local Natural-Language Matching Engine for Demo Mode
function runLocalIntelligentMatcher(userText) {
  const query = userText.toLowerCase();

  let matchedMeal = null;
  let rationale = "";

  // 1. South Indian check
  if (query.includes("south indian") || query.includes("dosa") || query.includes("sambar") || query.includes("kerala") || query.includes("coastal")) {
    if (query.includes("fish") || query.includes("seafood") || query.includes("curry") || query.includes("protein")) {
      matchedMeal = MEALS_CATALOG.find((m) => m.id === "kerala-fish-curry");
      rationale = "The Kerala Coconut Fish Curry delivers 38g of bioavailable marine protein and heart-healthy medium-chain triglycerides (MCTs) with anti-inflammatory curry leaves.";
    } else {
      matchedMeal = MEALS_CATALOG.find((m) => m.id === "masala-dosa");
      rationale = "Our Crispy Masala Dosa is 18-hour slow-fermented, packing active digestive enzymes and prebiotic fibers at only 380 total calories.";
    }
  }
  // 2. High Protein check
  else if (query.includes("high protein") || query.includes("protein") || query.includes("gym") || query.includes("muscle") || query.includes(">20g") || query.includes(">35g")) {
    if (query.includes("veg") || query.includes("soya") || query.includes("plant") || query.includes("chaap")) {
      matchedMeal = MEALS_CATALOG.find((m) => m.id === "tandoori-soya-chaap");
      rationale = "Our Tandoori Soya Chaap Power Bowl packs a massive 40g of complete plant protein, oven-roasted in carom seeds and Greek yogurt for optimal muscle synthesis.";
    } else if (query.includes("chicken") || query.includes("biryani") || query.includes("meat")) {
      matchedMeal = MEALS_CATALOG.find((m) => m.id === "chicken-biryani");
      rationale = "The Hyderabadi Dum Chicken Biryani packs 42g of lean poultry protein combined with saffron and warming metabolic spices.";
    } else {
      matchedMeal = MEALS_CATALOG.find((m) => m.id === "paneer-tikka-masala");
      rationale = "Paneer Tikka Masala provides 24g of slow-digesting casein protein with lycopene and metabolism-boosting fenugreek.";
    }
  }
  // 3. Low Calorie check
  else if (query.includes("low calorie") || query.includes("under 500") || query.includes("under 400") || query.includes("light") || query.includes("weight loss")) {
    if (query.includes("baingan") || query.includes("eggplant")) {
      matchedMeal = MEALS_CATALOG.find((m) => m.id === "baingan-bharta");
      rationale = "At only 320 calories and 12g dietary fiber, our Smoked Baingan Bharta delivers anthocyanin antioxidants while keeping insulin rock-steady.";
    } else if (query.includes("khichdi") || query.includes("ayurvedic") || query.includes("comfort")) {
      matchedMeal = MEALS_CATALOG.find((m) => m.id === "moong-dal-khichdi");
      rationale = "Moong Dal Khichdi is our 360-calorie Ayurvedic benchmark, providing easy-to-digest protein and calming probiotic yogurt kadhi.";
    } else {
      matchedMeal = MEALS_CATALOG.find((m) => m.id === "masala-dosa");
      rationale = "Our Masala Dosa is low in fat, 380 calories, and fermented for optimal probiotic gut health.";
    }
  }
  // 4. Vegan / Plant-Based check
  else if (query.includes("vegan") || query.includes("plant-based") || query.includes("chana") || query.includes("chickpea")) {
    matchedMeal = MEALS_CATALOG.find((m) => m.id === "chana-masala");
    rationale = "Our High-Protein Chana Masala features 22g clean legume protein and an impressive 16g prebiotic fiber that supports digestive health.";
  }
  // 5. Keto / Low Carb check
  else if (query.includes("keto") || query.includes("low carb") || query.includes("greens") || query.includes("spinach")) {
    matchedMeal = MEALS_CATALOG.find((m) => m.id === "palak-paneer");
    rationale = "Palak Paneer (Supergreens) delivers 20g protein and 30g healthy fats with only 14g total carbs, packed with bioavailable iron and magnesium.";
  }
  // 6. North Indian Classic / Lentils / Dal
  else if (query.includes("north indian") || query.includes("dal") || query.includes("makhani") || query.includes("punjabi")) {
    if (query.includes("dal")) {
      matchedMeal = MEALS_CATALOG.find((m) => m.id === "dal-makhani");
      rationale = "Our 16-hour slow-cooked Dal Makhani provides 19g protein and 14g resistant starch to fuel healthy gut microbiota.";
    } else {
      matchedMeal = MEALS_CATALOG.find((m) => m.id === "paneer-tikka-masala");
      rationale = "Char-grilled Paneer Tikka Masala is our North Indian crown jewel, providing 24g of protein with antioxidant-rich tomato and fenugreek.";
    }
  }
  // 7. Default Dietitian Pick
  else {
    matchedMeal = MEALS_CATALOG.find((m) => m.id === "paneer-tikka-masala");
    rationale = "I recommend our dietitian favorite: Paneer Tikka Masala! It combines 24g of slow-digesting protein with roasted antioxidant spices, fully verified for balanced metabolic health.";
  }

  // Safety fallback in case catalog is still loading
  if (!matchedMeal) {
    matchedMeal = MEALS_CATALOG.length > 0 ? MEALS_CATALOG[0] : null;
  }

  if (!matchedMeal) {
    return {
      text: "Our meal catalog is currently loading. Please ask again in just a moment!",
      recommendedMeal: null
    };
  }

  const responseText = `Here is your dietitian-verified Indian recommendation:\n\n**${matchedMeal.name}** (${matchedMeal.region})\n\n${rationale}\n\n*All macros are audited and certified for optimal nutritional balance.*`;

  return { text: responseText, recommendedMeal: matchedMeal };
}

function appendChatMessage(sender, text, recommendedMeal = null) {
  if (!chatMessagesContainer) return;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble chat-bubble--${sender}`;

  const iconName = sender === "bot" ? "leaf" : "person";
  const formattedText = text.replace(/\n/g, "<br>");

  let mealCardHtml = "";
  if (recommendedMeal) {
    mealCardHtml = `
      <div class="chat-dish-card">
        <div class="chat-dish-card-header">
          <img src="${recommendedMeal.image}" alt="${recommendedMeal.name}" class="chat-dish-card-img" />
          <div>
            <div class="chat-dish-card-title">${recommendedMeal.name}</div>
            <div class="chat-dish-card-price">${formatINR(recommendedMeal.price)}</div>
          </div>
        </div>
        <div class="chat-dish-macros">
          <span>🔥 ${recommendedMeal.calories} kcal</span>
          <span>💪 ${recommendedMeal.protein}g protein</span>
          <span>🌾 ${recommendedMeal.carbs}g carbs</span>
          <span>🥑 ${recommendedMeal.fats}g fats</span>
          <span>🌱 ${recommendedMeal.fiber}g fiber</span>
        </div>
        <button class="btn-chat-add-cart" data-id="${recommendedMeal.id}">
          <ion-icon name="cart"></ion-icon>
          <span>Add to Cart</span>
        </button>
      </div>
    `;
  }

  bubble.innerHTML = `
    <div class="bubble-avatar"><ion-icon name="${iconName}"></ion-icon></div>
    <div class="bubble-content">
      <p>${formattedText}</p>
      ${mealCardHtml}
    </div>
  `;

  chatMessagesContainer.appendChild(bubble);
  chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

  // Add event listener to embedded Add to Cart button
  if (recommendedMeal) {
    const addBtn = bubble.querySelector(".btn-chat-add-cart");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        addToCart(recommendedMeal.id);
      });
    }
  }
}

function showTypingIndicator() {
  const typingId = "typing-" + Date.now();
  const typingBubble = document.createElement("div");
  typingBubble.id = typingId;
  typingBubble.className = "chat-bubble chat-bubble--bot";
  typingBubble.innerHTML = `
    <div class="bubble-avatar"><ion-icon name="leaf"></ion-icon></div>
    <div class="chat-typing-dots">
      <span></span><span></span><span></span>
    </div>
  `;
  chatMessagesContainer.appendChild(typingBubble);
  chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  return typingId;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// =========================================================================
// 9. EVENT LISTENERS SETUP
// =========================================================================
function setupEventListeners() {
  // --- Cart Drawer Triggers ---
  if (btnCartTrigger) {
    btnCartTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  }
  if (btnCloseCart) {
    btnCloseCart.addEventListener("click", (e) => {
      e.preventDefault();
      closeCartDrawer();
    });
  }
  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCartDrawer);
  }
  if (btnExploreFromCart) {
    btnExploreFromCart.addEventListener("click", (e) => {
      e.preventDefault();
      closeCartDrawer();
    });
  }

  // --- Hero Bottom Meal Add Buttons ---
  document.querySelectorAll(".btn-card-quick-add").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dishId = btn.getAttribute("data-id");
      if (dishId) addToCart(dishId);
    });
  });

  // --- Hero Order Now Button ---
  if (btnHeroOrder) {
    btnHeroOrder.addEventListener("click", () => {
      addToCart("paneer-tikka-masala");
    });
  }

  // --- Filter Buttons ---
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter") || "all";
      renderMeals();
    });
  });

  // --- Reset Filter Button ---
  if (btnClearFilters) {
    btnClearFilters.addEventListener("click", resetFilters);
  }

  // --- Navbar Live Search ---
  if (navSearchInput) {
    navSearchInput.addEventListener("input", (e) => {
      activeSearchQuery = e.target.value;
      renderMeals();
    });
  }

  // --- AI Chatbot Window Controls ---
  if (btnAiChatLauncher) btnAiChatLauncher.addEventListener("click", openAiChat);
  if (btnCloseChatWidget) btnCloseChatWidget.addEventListener("click", closeAiChat);

  if (chatForm) {
    chatForm.addEventListener("submit", handleChatSubmission);
  }

  // Quick Suggestion Chips in Chat
  document.querySelectorAll(".chip-suggestion").forEach((chip) => {
    chip.addEventListener("click", () => {
      const prompt = chip.getAttribute("data-prompt");
      if (chatInput && prompt) {
        chatInput.value = prompt;
        handleChatSubmission();
      }
    });
  });

  // Clear Chat History
  if (btnClearChatHistory) {
    btnClearChatHistory.addEventListener("click", () => {
      if (chatMessagesContainer) {
        chatMessagesContainer.innerHTML = `
          <div class="chat-bubble chat-bubble--bot">
            <div class="bubble-avatar"><ion-icon name="leaf"></ion-icon></div>
            <div class="bubble-content">
              <p>Chat cleared! How can our <strong>Foodie Hub AI Assistant</strong> help guide your Indian nutrition goals today?</p>
            </div>
          </div>
        `;
      }
    });
  }

  // --- Checkout Action ---
  if (btnCheckout) {
    btnCheckout.addEventListener("click", () => {
      if (cartState.length === 0) return;
      closeCartDrawer();
      if (orderIdDisplay) {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        orderIdDisplay.textContent = `#FH-${randomNum}`;
      }
      if (checkoutSuccessModal) {
        checkoutSuccessModal.classList.remove("hidden");
      }
      cartState = [];
      renderCart();
    });
  }

  if (btnDoneCheckout) {
    btnDoneCheckout.addEventListener("click", () => {
      if (checkoutSuccessModal) checkoutSuccessModal.classList.add("hidden");
    });
  }

  // Plan Selection Buttons in Pricing
  document.querySelectorAll(".btn-plan-select").forEach((btn) => {
    btn.addEventListener("click", () => {
      const planName = btn.getAttribute("data-plan") || "Custom Plan";
      alert(`Thank you for selecting the ${planName}! Our clinical dietitian team will reach out to configure your meal schedule.`);
    });
  });

  // Recipe Kit Buttons
  document.querySelectorAll(".btn-recipe-kit").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dishId = btn.getAttribute("data-id");
      if (dishId) {
        addToCart(dishId);
      }
    });
  });

  // --- Contact Form ---
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (contactSuccessBanner) {
        contactSuccessBanner.classList.remove("hidden");
        contactForm.reset();
        setTimeout(() => {
          contactSuccessBanner.classList.add("hidden");
        }, 5000);
      }
    });
  }

  // Mobile Navigation Toggle
  if (btnMobileNav && navLinksWrap) {
    btnMobileNav.addEventListener("click", () => {
      navLinksWrap.classList.toggle("nav-open");
    });
  }

  // Global ESC Key Handler
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      if (checkoutSuccessModal) checkoutSuccessModal.classList.add("hidden");
      closeAiChat();
      closeRecipeDetailsModal();
    }
  });
}

// =========================================================================
// 10. THEMEALDB EXPLORE RECIPES & MODAL CONTROLLER
// =========================================================================
let currentExploreCategory = "All";
let currentExploreQuery = "Chicken";

/**
 * Safely resolves the TheMealDB API service module
 */
function getMealDbAPI() {
  if (typeof MealDbAPI !== "undefined" && MealDbAPI) return MealDbAPI;
  if (typeof window !== "undefined" && window.MealDbAPI) return window.MealDbAPI;
  return null;
}

/**
 * Initializes TheMealDB Explore Recipes section:
 * - Fetches and renders available recipe categories into filter pills.
 * - Executes initial recipe search to populate the section.
 * - Binds search form, surprise/random, and modal close event handlers.
 */
function initExploreRecipes() {
  const searchForm = document.getElementById("recipeApiSearchForm");
  const searchInput = document.getElementById("recipeApiSearchInput");
  const clearSearchBtn = document.getElementById("btnClearRecipeSearch");
  const randomBtn = document.getElementById("btnRecipeApiRandom");
  const retryBtn = document.getElementById("btnRecipeRetry");
  const recipeModalOverlay = document.getElementById("recipeModalOverlay");
  const closeRecipeModalBtn = document.getElementById("btnCloseRecipeModal");

  // Load Categories scroller on startup
  loadExploreCategories();

  // Initial recipe search (e.g. "Chicken") to provide immediate visual content
  executeRecipeSearch("Chicken");

  // Search form submit listener
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = searchInput ? searchInput.value.trim() : "";
      if (q) {
        currentExploreQuery = q;
        currentExploreCategory = "All";
        updateActiveCategoryButton("All");
        executeRecipeSearch(q);
      }
    });
  }

  // Clear search input icon trigger
  if (searchInput && clearSearchBtn) {
    searchInput.addEventListener("input", () => {
      if (searchInput.value.trim() !== "") {
        clearSearchBtn.classList.remove("hidden");
      } else {
        clearSearchBtn.classList.add("hidden");
      }
    });

    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearSearchBtn.classList.add("hidden");
      searchInput.focus();
    });
  }

  // Surprise Me / Random Recipe
  if (randomBtn) {
    randomBtn.addEventListener("click", async () => {
      try {
        setExploreState("loading");
        const api = getMealDbAPI();
        if (!api) throw new Error("TheMealDB API module is not ready.");
        const meal = await api.getRandomMeal();
        setExploreState("idle");
        if (meal && meal.idMeal) {
          openRecipeDetailsModal(meal.idMeal);
        } else {
          setExploreState("empty", "Could not find a random recipe at this time.");
        }
      } catch (err) {
        console.error("Failed to fetch random meal from TheMealDB:", err);
        setExploreState("error", "Could not retrieve a surprise recipe. Please try again.");
      }
    });
  }

  // Retry Button on error
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      if (currentExploreCategory !== "All") {
        executeCategoryFilter(currentExploreCategory);
      } else {
        executeRecipeSearch(currentExploreQuery || "Chicken");
      }
    });
  }

  // Modal Close trigger
  if (closeRecipeModalBtn) {
    closeRecipeModalBtn.addEventListener("click", closeRecipeDetailsModal);
  }

  // Modal Backdrop Click trigger
  if (recipeModalOverlay) {
    recipeModalOverlay.addEventListener("click", (e) => {
      if (e.target === recipeModalOverlay) {
        closeRecipeDetailsModal();
      }
    });
  }
}

/**
 * Loads and renders category pills from TheMealDB getMealCategories()
 */
async function loadExploreCategories() {
  const scroller = document.getElementById("recipeCategoriesScroller");
  if (!scroller) return;

  try {
    const api = getMealDbAPI();
    const categories = api ? await api.getMealCategories() : [];
    let html = `<button class="btn-recipe-cat active" data-category="All">All Categories</button>`;
    categories.forEach((cat) => {
      html += `<button class="btn-recipe-cat" data-category="${cat.strCategory}">${cat.strCategory}</button>`;
    });
    scroller.innerHTML = html;

    // Attach click events on category pills
    scroller.querySelectorAll(".btn-recipe-cat").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-category");
        currentExploreCategory = cat;
        updateActiveCategoryButton(cat);

        if (cat === "All") {
          executeRecipeSearch(currentExploreQuery || "Chicken");
        } else {
          executeCategoryFilter(cat);
        }
      });
    });
  } catch (err) {
    console.warn("Could not load categories list from TheMealDB:", err);
  }
}

function updateActiveCategoryButton(activeCat) {
  const scroller = document.getElementById("recipeCategoriesScroller");
  if (!scroller) return;
  scroller.querySelectorAll(".btn-recipe-cat").forEach((b) => {
    b.classList.toggle("active", b.getAttribute("data-category") === activeCat);
  });
}

/**
 * Manages loading, empty, and error state elements
 */
function setExploreState(state, message = "") {
  const loading = document.getElementById("recipeApiLoading");
  const errorBox = document.getElementById("recipeApiError");
  const errorMsg = document.getElementById("recipeApiErrorMessage");
  const emptyBox = document.getElementById("recipeApiEmpty");
  const emptyMsg = document.getElementById("recipeApiEmptyMessage");
  const grid = document.getElementById("exploreRecipesGrid");

  if (loading) loading.classList.toggle("hidden", state !== "loading");
  if (errorBox) {
    errorBox.classList.toggle("hidden", state !== "error");
    if (state === "error" && errorMsg && message) errorMsg.textContent = message;
  }
  if (emptyBox) {
    emptyBox.classList.toggle("hidden", state !== "empty");
    if (state === "empty" && emptyMsg && message) emptyMsg.textContent = message;
  }
  if (state === "loading" && grid) {
    grid.innerHTML = "";
  }
}

/**
 * Executes a recipe search against TheMealDB
 */
async function executeRecipeSearch(query) {
  setExploreState("loading");
  try {
    const api = getMealDbAPI();
    if (!api) throw new Error("TheMealDB API service is not loaded.");
    const meals = await api.searchMeals(query);
    if (!meals || meals.length === 0) {
      setExploreState(
        "empty",
        `We couldn't find any recipes matching "${query}". Try searching for popular terms like "Chicken", "Curry", "Pasta", or select a category above!`
      );
      return;
    }
    setExploreState("idle");
    renderExploreRecipeCards(meals);
  } catch (err) {
    setExploreState(
      "error",
      `Failed to load recipes from TheMealDB (${err.message}). Please check your connection and try again.`
    );
  }
}

/**
 * Filters recipes by category against TheMealDB
 */
async function executeCategoryFilter(category) {
  setExploreState("loading");
  try {
    const api = getMealDbAPI();
    if (!api) throw new Error("TheMealDB API service is not loaded.");
    const meals = await api.filterMealsByCategory(category);
    if (!meals || meals.length === 0) {
      setExploreState("empty", `No recipes found in the "${category}" category.`);
      return;
    }
    setExploreState("idle");
    renderExploreRecipeCards(meals, category);
  } catch (err) {
    setExploreState(
      "error",
      `Failed to filter recipes for category "${category}" (${err.message}).`
    );
  }
}

/**
 * Generates and injects HTML for recipe cards into #exploreRecipesGrid
 */
function renderExploreRecipeCards(meals, categoryFallback = "") {
  const grid = document.getElementById("exploreRecipesGrid");
  if (!grid) return;

  grid.innerHTML = meals
    .map((meal) => {
      const cat = meal.strCategory || categoryFallback || "Global";
      const area = meal.strArea
        ? `<span class="explore-recipe-area-badge">${meal.strArea}</span>`
        : "";
      return `
        <article class="explore-recipe-card" data-id="${meal.idMeal}">
          <div class="explore-recipe-thumb-wrap">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="explore-recipe-thumb" loading="lazy" />
            <span class="explore-recipe-badge">${cat}</span>
            ${area}
          </div>
          <div class="explore-recipe-body">
            <h3 class="explore-recipe-title">${meal.strMeal}</h3>
            <button class="btn-view-recipe" data-id="${meal.idMeal}" aria-label="View recipe for ${meal.strMeal}">
              <ion-icon name="book-outline"></ion-icon>
              <span>View Recipe & Ingredients</span>
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  // Attach card click listeners
  grid.querySelectorAll(".explore-recipe-card").forEach((card) => {
    card.addEventListener("click", () => {
      const mealId = card.getAttribute("data-id");
      if (mealId) openRecipeDetailsModal(mealId);
    });
  });
}

/**
 * Fetches full meal details by ID and presents the rich recipe modal
 */
async function openRecipeDetailsModal(mealId) {
  const modalOverlay = document.getElementById("recipeModalOverlay");
  const modalBody = document.getElementById("recipeModalBody");
  if (!modalOverlay || !modalBody) return;

  modalOverlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Loading skeleton inside modal
  modalBody.innerHTML = `
    <div style="text-align: center; padding: 6rem 2rem;">
      <div class="recipe-spinner" style="margin: 0 auto 1.6rem;"></div>
      <p style="font-size: 1.6rem; color: var(--text-muted);">Loading full recipe details from TheMealDB...</p>
    </div>
  `;

  try {
    const api = getMealDbAPI();
    if (!api) throw new Error("TheMealDB API service is not loaded.");
    const meal = await api.getMealDetails(mealId);
    if (!meal) {
      modalBody.innerHTML = `
        <div style="text-align: center; padding: 5rem 2rem;">
          <ion-icon name="alert-circle-outline" style="font-size: 4.8rem; color: #e8590c; margin-bottom: 1.2rem;"></ion-icon>
          <h3>Recipe Not Found</h3>
          <p>We could not find the recipe details for ID #${mealId}.</p>
        </div>
      `;
      return;
    }

    const ingredients = api.extractIngredients(meal);

    const ingredientsHtml =
      ingredients.length > 0
        ? `<div class="recipe-ingredients-grid">
            ${ingredients
              .map(
                (ing) => `
              <div class="ingredient-chip">
                <span class="ingredient-name">${ing.name}</span>
                ${ing.measure ? `<span class="ingredient-measure">${ing.measure}</span>` : ""}
              </div>
            `
              )
              .join("")}
          </div>`
        : `<p style="font-size: 1.4rem; color: var(--text-muted); margin-bottom: 2rem;">No ingredient details available.</p>`;

    const youtubeButton =
      meal.strYoutube && meal.strYoutube.trim() !== ""
        ? `<a href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer" class="btn-youtube-link">
            <ion-icon name="logo-youtube"></ion-icon>
            <span>Watch on YouTube</span>
          </a>`
        : "";

    modalBody.innerHTML = `
      <div class="recipe-modal-hero">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-modal-img" />
        <div class="recipe-modal-title-group">
          <div class="recipe-modal-tags">
            ${meal.strCategory ? `<span class="recipe-tag-pill"><ion-icon name="restaurant-outline"></ion-icon> ${meal.strCategory}</span>` : ""}
            ${meal.strArea ? `<span class="recipe-tag-pill recipe-tag-pill--area"><ion-icon name="earth-outline"></ion-icon> ${meal.strArea} Cuisine</span>` : ""}
          </div>
          <h3 id="recipeModalTitle">${meal.strMeal}</h3>
          ${youtubeButton}
        </div>
      </div>

      <div class="recipe-modal-section">
        <h4 class="recipe-section-heading">
          <ion-icon name="basket-outline"></ion-icon>
          <span>Ingredients & Measurements (${ingredients.length})</span>
        </h4>
        ${ingredientsHtml}
      </div>

      <div class="recipe-modal-section">
        <h4 class="recipe-section-heading">
          <ion-icon name="reader-outline"></ion-icon>
          <span>Cooking Instructions</span>
        </h4>
        <div class="recipe-instructions-content">${meal.strInstructions || "No instructions provided."}</div>
      </div>
    `;
  } catch (err) {
    console.error("Error displaying recipe modal details:", err);
    modalBody.innerHTML = `
      <div style="text-align: center; padding: 5rem 2rem;">
        <ion-icon name="alert-circle-outline" style="font-size: 4.8rem; color: #e8590c; margin-bottom: 1.2rem;"></ion-icon>
        <h3>Failed to Load Recipe</h3>
        <p>${err.message}</p>
      </div>
    `;
  }
}

function closeRecipeDetailsModal() {
  const modalOverlay = document.getElementById("recipeModalOverlay");
  if (modalOverlay) {
    modalOverlay.classList.add("hidden");
    document.body.style.overflow = "";
  }
}
