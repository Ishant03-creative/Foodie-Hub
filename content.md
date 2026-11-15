# FOODIE HUB
## Project Documentation

### 1. Introduction

Foodie Hub is a web-based food discovery and recipe exploration platform developed to make meal discovery easier and more interactive.

The website allows users to browse different food items, explore their nutritional information, search for meals, and discover recipes. It combines an interactive user interface with locally stored meal data and external recipe API integration.

### 2. Problem Statement

With the growing number of food and recipe platforms, users often need to visit multiple websites to discover meals and understand their nutritional information.

Finding meals according to specific preferences, such as high-protein or low-calorie options, can also be inconvenient.

Foodie Hub aims to provide a single platform where users can explore meals, view nutritional information, and discover recipes through a simple and user-friendly interface.

### 3. Objectives

The main objectives of Foodie Hub are:

- To develop an interactive and user-friendly food discovery website.
- To display different meals with relevant information.
- To provide nutritional details such as calories, protein, carbohydrates, fats, and fibre.
- To implement search and category-based filtering.
- To provide shopping cart functionality.
- To integrate an external recipe API.
- To demonstrate practical frontend web development concepts.

### 4. Technologies Used

**HTML5**

Used to create the basic structure of the website, including navigation bars, sections, cards, forms, and other elements.

**CSS3**

Used for styling, layouts, colours, animations, typography, and responsive design.

**JavaScript**

Used to implement interactive features such as meal rendering, searching, filtering, cart operations, chatbot interactions, and API communication.

**JSON**

Used to store the local meal catalogue separately from the main JavaScript code.

**TheMealDB API**

Used as an external source for retrieving recipe-related information.

**Git and GitHub**

Used for source code management and version control.

### 5. Main Modules

#### 5.1 Home Page

The home page introduces Foodie Hub and provides navigation to the different sections of the website.

#### 5.2 Meal Catalogue

This module displays available meals with their images, descriptions, prices, and nutritional information.

#### 5.3 Search and Filtering

Users can search for meals and filter them according to categories and nutritional preferences, such as high-protein and low-calorie meals.

#### 5.4 Shopping Cart

The shopping cart allows users to add meals, update quantities, remove items, and calculate the total price dynamically.

#### 5.5 Recipe Exploration

This module uses TheMealDB API to explore external recipes and retrieve recipe-related information.

#### 5.6 Chatbot and Meal Recommendations

The chatbot provides basic meal recommendations using locally implemented keyword-matching logic.

### 6. System Working

Foodie Hub follows a client-side web application architecture.

1. The browser loads the website through the main HTML file.
2. CSS files control the appearance and responsive layout.
3. JavaScript loads the local meal catalogue from `meals.json`.
4. Meal information is dynamically displayed on the website.
5. User interactions such as search, filters, and cart operations are handled through JavaScript.
6. External recipe information can be retrieved through TheMealDB API.

### 7. System Architecture

The project consists of three main layers:

**Presentation Layer:** HTML and CSS are responsible for the structure, layout, and visual appearance of the website.

**Application Logic Layer:** JavaScript manages user interactions, meal rendering, search, filtering, cart operations, and API requests.

**Data Layer:** The local JSON file stores the main meal catalogue, while TheMealDB provides external recipe data.

### 8. Limitations

- The project currently uses a frontend-only architecture.
- No backend server or database is implemented.
- User login and authentication are not implemented.
- Checkout functionality is a demonstration and does not process real payments or orders.
- Contact form submissions are not connected to a backend.
- The chatbot currently uses keyword-based local matching.
- External API functionality depends on internet connectivity and API availability.

### 9. Future Enhancements

- Implement a backend using Node.js and Express.
- Integrate a database for storing meals and user information.
- Add secure user authentication.
- Improve meal recommendations using AI-based services.
- Integrate a real payment gateway.
- Improve recipe discovery and nutritional data accuracy.

### 10. Conclusion

Foodie Hub demonstrates how frontend web technologies can be used to develop an interactive food discovery platform.

The project combines meal browsing, nutritional information, search and filtering, shopping cart functionality, chatbot-based recommendations, and external recipe API integration.

It provides practical experience in HTML, CSS, JavaScript, JSON, API integration, and version control. The project can be further enhanced through backend development, database integration, and advanced recommendation systems.