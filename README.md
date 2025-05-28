# Real Estate Website

## Project Overview

This project is a **Real Estate Listing Website** built using **HTML, CSS, and JavaScript** . The site allows users to browse, search, and filter property listings stored in a local JSON file.

## Prerequisites

Create an config.js file in the root directory with the following code inside :
window.config = {
  GOOGLE_MAPS_API_KEY: "YOUR_GOOGLE_MAPS_API_KEY",
  GOOGLE_MAPS_ID: "YOUR_MAPS_ID",
};


- Node.js (v16+ recommended)
- npm (comes with Node.js)
- Modern browser (Chrome, Firefox, Edge)

## Features

- **Property Listings View**

  - Detailed cards with price, location, size
  - High-quality image galleries

- **Advanced Search**

  - Filter by location, price range, property type
  - Sort by newest/price

- **Interactive Elements**

  - Property map visualization
  - Responsive design for all devices

  ## Technologies Used

- **Frontend**: HTML5, CSS3 (Sass), JavaScript (ES6+)
- **Tools**: npm, Git, Live-Server
- **Data**: JSON for property listings and users
- **AI Chat**: AI Chat Bot for better user experience

---

## Setup Instructions

### **1. Clone the Repository**

```sh
git clone https://autocode.git.epam.com/bozhidar.nunev/capstone-project.git
cd capstone-project
```

### **2. Install Dependencies**

Ensure you have **Node.js** and **npm** installed, then run:

```sh
npm install
```

### **3. Compile Sass Files**

This project uses **Sass** for styling. To compile `.scss` files into `.css`, run:

```sh
npm run compile
```

### **4. Check with lint for formatting errors**

```sh
npm run lint
```

---

## Project Structure

```
capstone-project/
├── src/
│   ├── scripts/      # JavaScript modules
│   └── pages/        # Additional HTML pages
├── assets/           # Static assets
├── styles/           # Sass stylesheets
├── data/             # JSON data files
├── index.html        # Main entry point
├── package.json      # Project configuration
└── README.md         # Documentation
```

---

## Prerequisites

- **Node.js** & **npm** installed
- Basic knowledge of **HTML, CSS, and JavaScript**
- A modern browser (Chrome, Firefox, Edge, etc.)

---

# JavaScript Functions Overview

## **scripts/home.js**

- **`loadProperties()`**  
  Fetches property data from `/data/properties.json` and initializes homepage displays.
- **`homePageSwiper(properties)`**  
  Creates interactive property carousel using Swiper.js with autoplay (5s delay) and navigation controls.
- **`latestAddedProperties(properties)`**  
  Renders the 8 newest property listings in a responsive grid format.
- **`userDropdownMenu()`**  
  Manages user profile dropdown interactions with keyboard and click event support.

## **scripts/contactAgent.js**

- **`contactForm` Event Handler**  
  Handles form submission for contacting property agents. Validates input fields and provides user feedback.

## **scripts/login.js**

- **`fetchUsers()`**  
  Retrieves registered users from `/data/users.json` (async).
- **`getLocalUsers()`**  
  Gets locally registered users from `localStorage`.
- **Login Form Handler**  
  Authenticates against combined API + local users, stores session data in `localStorage`.

## **scripts/propertiesPageFunctions.js**

- **`loadProperties()`**  
  Loads all properties with pagination support (8 items/page).
- **`renderPropertyCards()`**  
  Dynamically generates property cards with lazy-loaded images.
- **`toggleAdditionalProperties()`**  
  Shows/hides +2 additional properties (mobile-first pattern).
- **Navigation Functions**  
  `goToNextPage()` and `goToPrevPage()` handle pagination with smooth scroll.

## **scripts/propertiesSearch.js**

- **`propertySearch(allProperties, loadCallback)`**  
  Main search controller with 300ms debounce.
- **`applyFilters(properties)`**  
  Filters by:
  - Text search (title/location)
  - Property type
  - Price range (5 predefined brackets)
- **`sortProperties(properties)`**  
  Orders by: Price (↑/↓)

## **scripts/register.js**

- **Registration Form Handler**  
  Validates:
  - Required fields
  - Password match  
    Stores new users in `localStorage`.

## **scripts/singlePropertyCard.js**

- **`loadPropertyData()`**  
  Loads individual property details from URL `?id` parameter.
- **`initMap(property)`**  
  Initializes Google Maps with property marker using coordinates.
- **`loadGoogleMapsAPI()`**  
  Dynamically loads Google Maps API with error handling.

## **scripts/userDashboard.js**

- **`renderProperties(containerId, properties, limit)`**  
  Creates personalized property cards for:
  - `featuredProperties`
  - `savedProperties`
  - `propertiesViewed` (limit: 2)
  - `favoriteProperties` (limit: 3)
- **Logout Handler**  
  Clears `currentUser` from `localStorage` and redirects.

---

## Author

- **Bozhidar Nunev**

---
