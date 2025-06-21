# 🎬 Movie Explorer

Movie Explorer is a sleek, modern React app that helps users discover trending movies and search thousands of titles using the [TMDb API](https://www.themoviedb.org/documentation/api). It features a clean UI, search functionality, error/loading states, and optional analytics tracking powered by Appwrite.


---

## ✨ Features

- 🔍 **Movie Search** – Find thousands of titles using TMDb’s API  
- 📈 **Trending Movies** – Displays the most popular movies on load  
- 🌀 **Loading & Error UI** – Clean feedback while fetching or failing  
- 💅 **Tailwind CSS** – Fully responsive, mobile-first styling  
- 🧠 **Appwrite Integration** *(optional)* – Store and track search analytics  

---

## 📸 Demo
### Homepage
![Homepage Screenshot](./screenshots/homepage.png)

### Search Results
![Search Screenshot](./screenshots/search-results.png)


---

## ⚙️ Tech Stack

- **React + Vite**  
- **Tailwind CSS**  
- **Axios**  
- **TMDb API**  
- **Appwrite** (optional)

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/movie-explorer.git
cd movie-explorer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

This app uses environment variables for API access and Appwrite integration. A template is provided:

```bash
cp env_example .env.local
```

Then open `.env.local` and fill in the values:

```env
VITE_TMDB_API_KEY=           # Get this from TMDb
VITE_API_BASE_URL=https://api.themoviedb.org/3

# Appwrite (Optional Analytics Tracking)
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_ENDPOINT=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
```

> ⚠️ If you're not using Appwrite, you can leave those values blank.

### 4. Start the App

```bash
npm run dev
```

Open your browser (localhost)

---

## 🧠 Appwrite Setup (Optional)

If you want to enable analytics tracking (e.g., saving search term frequency), set up a [free Appwrite backend](https://appwrite.io/).

You’ll need:
- A **project**
- A **database** and **collection**
- Proper permissions and attributes:
  - `searchTerm` (string)
  - `count` (integer)
  - `movie_id` (string)
  - `poster` (string)

> You can leave the Appwrite fields empty in `.env.local` if you’re not using this feature.

---

## 🧠 Credits

- 🎓 Inspired by [JavaScript Mastery](https://www.jsmastery.pro/) tutorials  
- 🎬 Movie data from [The Movie Database (TMDb)](https://www.themoviedb.org/)  
- 🛠 Optional backend via [Appwrite](https://appwrite.io)
