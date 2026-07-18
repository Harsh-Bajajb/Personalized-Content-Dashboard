# Personalized Content Dashboard

A highly interactive and responsive web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit**. This dashboard aggregates content from various sources (News, Recommendations, Social), allows users to curate their feed by favoriting and reordering items, and persists user preferences locally.

## 🚀 Project Overview

The dashboard is designed to provide a unified content consumption experience. Key capabilities include:
- **Unified Feed:** Merges multiple mock API sources into a single chronologically sorted feed.
- **Interactive UI:** Smooth drag-and-drop reordering powered by `@dnd-kit`, fluid layout transitions using `framer-motion`, and a responsive sidebar.
- **State Management & Persistence:** Redux Toolkit handles global state (Favorites, Preferences, API fetching), seamlessly syncing with local storage so your layout and saved items persist across sessions.
- **Dark Mode:** A sleek, class-based dark mode toggle synced to Redux preferences.
- **Robust Testing:** Comprehensive test coverage via Jest, React Testing Library, and Cypress End-to-End tests.

## ⚙️ Setup Instructions

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Environment Variables
Copy the provided `.env.example` file to create your own local environment file:
```bash
cp .env.example .env.local
```
*Note: The app currently uses mocked RTK Query endpoints for demonstration, so it will run perfectly fine without inserting real API keys.*

### 3. Run the Development Server
Start the Next.js development server:
```bash
npm run dev
```
Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to view the application.

### 4. Running Tests
- **Unit & Integration Tests:** Run `npm run test` (powered by Jest).
- **End-to-End Tests:** Ensure the dev server is running, then execute `npm run cypress:open` to launch the Cypress runner.

## 🗺️ User Flow

1. **Set Preferences:** Start by navigating to the **Settings** page via the sidebar to toggle Dark Mode. This preference is immediately saved to Redux and local storage.
2. **View Feed:** Head over to the **Feed** (`/dashboard`). The application concurrently fetches mock News, Recommendations, and Social data, merging them into a single, unified view.
3. **Interact & Reorder:** 
   - Hover over cards to see them scale up. 
   - Click and drag any card to reorder the layout. The new custom order is saved automatically!
4. **Search & Favorite:** 
   - Use the top search bar (equipped with a 400ms debounce) to filter content dynamically.
   - Click the heart icon on any interesting card to add it to your Favorites.
5. **Review Saved Content:** Navigate to the **Favorites** tab to see all your curated, saved content in one place.

## ✅ Implemented vs. Bonus Features

### Implemented Core Features
- Next.js 14 App router setup with nested layouts and TypeScript.
- Redux Toolkit integration (`preferencesSlice`, `favoritesSlice`, and custom local storage persistence listener).
- RTK Query API slices simulating data fetching from multiple domains.
- A responsive UI featuring a collapsible sidebar, header, and reusable `ContentCard` components.
- Feed view with unified data merging and a "Load More" pagination strategy.
- Complete Unit, Integration, and E2E testing suites (Jest + Cypress).

### Implemented "Bonus" Enhancements
- **Drag-and-Drop Reordering:** Fully functional card reordering utilizing `@dnd-kit/core` and `@dnd-kit/sortable`, persisting the custom order to Redux.
- **Animations:** High-end `framer-motion` implementations including card hover scaling, page-transition fade-ins, and a custom loading spinner.
- **Dark Mode:** System-wide dark mode styling utilizing Tailwind's `dark:` classes, controlled by the user's Redux preferences state.
