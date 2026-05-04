# 🌊 Water Trails Ratnapura

> *"Ratnapura's greatest treasures are its sapphire-clear waterfalls and emerald rivers that remain hidden from the world. We bring these secrets to light."*

A full-stack **MERN** web application that dynamically maps and indexes the hidden waterfalls, natural pools, and water destinations of the **Ratnapura region, Sri Lanka**.

![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-Backend-black?style=flat-square&logo=express)
![React](https://img.shields.io/badge/React-Frontend-blue?style=flat-square&logo=react)
![Node](https://img.shields.io/badge/Node.js-Runtime-green?style=flat-square&logo=nodedotjs)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Hosting-blue?style=flat-square)

---

## ✨ Features

- 🗺️ **Interactive GPS Map** — Live Leaflet map with real-time user location tracking
- 📍 **Geospatial Search** — MongoDB `$near` queries to find closest water locations
- 🔐 **Secure Admin CMS** — JWT + bcrypt authentication for managing all database entries
- 📸 **Direct Image Uploads** — Multer + Cloudinary integration (no manual URL pasting!)
- ✏️ **Full CRUD** — Create, Read, Update, Delete water locations from the Admin Panel
- 💬 **WhatsApp Contact Form** — Users can submit new locations directly to the developer
- 📱 **Progressive Web App (PWA)** — Installable and offline-capable via Vite PWA plugin
- 🌙 **Premium Dark UI** — Glassmorphism design with animated hover effects

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, React Router DOM, React Leaflet |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (GeoJSON / 2dsphere index) |
| **Auth** | JSON Web Tokens (JWT) + bcryptjs |
| **Image Storage** | Cloudinary via Multer + Streamifier |
| **Maps** | Leaflet.js with OpenStreetMap tiles |
| **PWA** | vite-plugin-pwa |

---

## 📁 Project Structure

```
WaterTrailsRatnapura/
├── backend/
│   ├── config/
│   │   └── cloudinary.js       # Cloudinary SDK config
│   ├── controllers/
│   │   ├── authController.js   # Register / Login logic
│   │   └── waterTrailController.js  # CRUD + Cloudinary upload
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT protection
│   ├── models/
│   │   ├── User.js             # Admin user schema
│   │   └── WaterTrail.js       # GeoJSON location schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── waterTrailRoutes.js
│   ├── .env                    # Environment variables (not committed)
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── HeroMap.jsx     # Leaflet map + GPS tracking
        │   ├── Navbar.jsx
        │   └── ErrorBoundary.jsx
        ├── hooks/
        │   └── useGeolocation.js
        ├── pages/
        │   ├── Home.jsx
        │   ├── Locations.jsx   # Full locations grid
        │   ├── About.jsx
        │   ├── Contact.jsx     # WhatsApp contact form
        │   └── AdminPanel.jsx  # CMS Dashboard
        └── utils/
            └── haversine.js    # Distance calculation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account (free tier)

### 1. Clone the Repository
```bash
git clone https://github.com/V-Ashen/WaterTrailsRatnapura.git
cd WaterTrailsRatnapura
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:
```bash
node server.js
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🌿 Ethical Tourism — The Guardian's Code

Many of these locations are untouched. They are clean. They are silent.  
As a user of Water Trails, you agree to be a **Guardian of the Trail**.  
Carry your trash back, respect the silence, and leave only footprints.

---

## 👨‍💻 Developer

**Vihanga Asen**  
[![GitHub](https://img.shields.io/badge/GitHub-V--Ashen-black?style=flat-square&logo=github)](https://github.com/V-Ashen)

---

## 📄 License

This project is licensed for educational and personal use.
