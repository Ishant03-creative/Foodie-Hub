# Foodie Hub 🍽️
### Discover Meals, Explore Recipes, Eat Smarter.

Foodie Hub is a food discovery and recipe exploration website designed to help users discover different meals, explore recipes, and view nutritional information in one place.

The platform provides an interactive interface where users can browse meals, search and filter options based on their preferences, view nutritional details, and interact with various website features.

## ✨ Features

- **Meal Discovery:** Browse a collection of meals with images, descriptions, and pricing.
- **Nutritional Information:** View calories, protein, carbohydrates, fats, and fibre for available meals.
- **Smart Search and Filters:** Search meals and filter them according to categories and nutritional preferences.
- **Shopping Cart:** Add meals, update quantities, remove items, and calculate the total price.
- **Recipe Exploration:** Includes integration with TheMealDB API to explore external recipes.
- **Meal Recommendation Chatbot:** Provides basic meal suggestions using locally implemented keyword-matching logic.
- **Responsive Design:** User-friendly interface designed for desktop, tablet, and mobile devices.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive design |
| JavaScript | Interactive functionality |
| JSON | Local meal data storage |
| TheMealDB API | External recipe data |
| Git & GitHub | Version control |
| Vercel | Deployment |

## 📁 Project Structure

```text
Foodie-Hub/
│
├── index.html
├── README.md
├── content.md
├── meals.json
├── manifest.webmanifest
│
├── JS/
│   ├── script.js
│   └── api.js
│
├── css/
│   └── style.css
│
└── img/
    └── meals/
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser.
- Visual Studio Code (recommended).
- Live Server extension.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ishant03-creative/Foodie-Hub.git
   ```

2. Open the downloaded project folder in Visual Studio Code.

3. Install the Live Server extension if it is not already installed.

4. Right-click `index.html` and select **Open with Live Server**.

5. Explore Foodie Hub in your browser.

A local development server is recommended for loading JSON files and making API requests.

## 🌐 API Integration

Foodie Hub uses [TheMealDB API](https://www.themealdb.com/) as an external source for recipe information.

The project also maintains a separate local meal catalogue in `meals.json`, which provides the data used for the main meal discovery experience.

API functionality depends on internet connectivity and the availability of the external service.

## ⚠️ Project Limitations

- The current application uses a frontend-only architecture.
- No backend server or database is implemented.
- User authentication is not available.
- Cart and checkout functionality are demonstrations and do not process real transactions.
- Contact form submissions are not connected to a backend service.
- Chatbot recommendations use local matching logic rather than a fully trained AI model.
- Nutritional values are provided for informational purposes and are not medical advice.

## 🔮 Future Scope

- Backend development using Node.js and Express.
- Database integration for storing user and meal information.
- Secure user authentication.
- Improved personalised meal recommendations.
- Real payment gateway integration.
- Enhanced nutritional data and recipe recommendations.

## 🙌 Credits

- Recipe data: [TheMealDB](https://www.themealdb.com/)
- Icons: [Ionicons](https://ionic.io/ionicons)
- Fonts: [Google Fonts](https://fonts.google.com/)

---

**Project Name:** Foodie Hub  
**Project Type:** Food Discovery and Recipe Exploration Website  
**Architecture:** Frontend Web Application