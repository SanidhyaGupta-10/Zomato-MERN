# 🍕 Zomato - Full Stack Food Delivery Platform

A modern full-stack food delivery application built with TypeScript, React, Express, and MongoDB. This project enables users to browse restaurants, view food items, save favorites, and allows restaurant partners to manage their menus.


---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Running the Application](#running-the-application)

---

## 🎯 Overview

Zomato is a comprehensive food delivery platform that bridges the gap between food enthusiasts and restaurant partners. Users can explore restaurants, browse menus, save their favorite items, and manage their preferences. Restaurant partners have dedicated tools to manage their food items and view their profiles.

The application follows a modern full-stack architecture with:

- **Backend**: RESTful API built with Express.js and TypeScript
- **Frontend**: React with TypeScript and Tailwind CSS for responsive UI
- **Database**: MongoDB for scalable data persistence
- **Authentication**: JWT-based authentication for both users and food partners

---

## ✨ Features

### User Features

- 👤 **User Registration & Login** - Secure authentication with JWT tokens
- 🔍 **Browse Restaurants & Food Items** - Explore multiple food partners and their menus
- ❤️ **Save Favorites** - Save liked food items for quick access
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔐 **Secure Authentication** - Cookie-based session management

### Food Partner Features

- 🏪 **Partner Registration & Login** - Dedicated authentication for restaurant owners
- 🍔 **Manage Food Items** - Create, update, and manage menu items with images
- 📊 **Partner Profile** - Public profile showcasing restaurant information
- 🖼️ **Image Management** - Upload and manage food item images using ImageKit
- 📈 **Menu Analytics** - Track food items and user interactions

### Core Features

- 🔐 **JWT Authentication** - Secure API endpoints with token-based auth
- 🎨 **Tailwind CSS** - Modern, responsive UI with utility-first CSS
- 🛡️ **CORS Support** - Configured for secure cross-origin requests
- 📦 **Scalable Architecture** - Modular structure for easy maintenance
- 🔌 **RESTful API** - Standard HTTP methods for CRUD operations

---

## 🛠️ Tech Stack

### Backend

| Technology        | Purpose               | Version |
| ----------------- | --------------------- | ------- |
| **Node.js**       | JavaScript Runtime    | Latest  |
| **Express.js**    | Web Framework         | ^5.2.1  |
| **TypeScript**    | Type Safety           | ^6.0.3  |
| **MongoDB**       | Database              | N/A     |
| **Mongoose**      | ODM                   | ^9.1.1  |
| **JWT**           | Authentication        | ^9.0.3  |
| **Bcrypt**        | Password Hashing      | ^6.0.0  |
| **ImageKit**      | Image Management      | ^7.1.1  |
| **Multer**        | File Upload           | ^2.0.2  |
| **CORS**          | Cross-Origin Support  | ^2.8.5  |
| **Cookie Parser** | Cookie Handling       | ^1.4.7  |
| **Dotenv**        | Environment Variables | ^17.2.3 |
| **TSX**           | TypeScript Executor   | ^4.21.0 |

### Frontend

| Technology       | Purpose             | Version |
| ---------------- | ------------------- | ------- |
| **React**        | UI Library          | ^19.2.0 |
| **TypeScript**   | Type Safety         | ^6.0.3  |
| **Vite**         | Build Tool          | ^7.2.4  |
| **React Router** | Client-Side Routing | ^7.11.0 |
| **Tailwind CSS** | Styling             | ^4.1.18 |
| **Axios**        | HTTP Client         | ^1.13.2 |
| **ESLint**       | Code Linting        | ^9.39.1 |

### DevOps & Tools

- Git & GitHub - Version Control
- npm - Package Manager
- TypeScript - Static Type Checking
- ESLint - Code Quality

---

## 🏗️ Project Architecture

### **Architecture Diagram**

```
        ╔════════════════════════════════════════════╗
        ║    Frontend (React + TypeScript)           ║
        ╠════════════════════════════════════════════╣
        ║ Pages: Home, Saved, Login, Register,       ║
        ║        Partner Profile                     ║
        ║ Hooks: useAuth, useFood, useSaves          ║
        ║ Components: Routing, UI Components         ║
        ╚════════════════════════════════════════════╝
                            ▲
                            │ HTTP/REST API (Axios)
                            │
        ╔════════════════════╧════════════════════════╗
        ║  Backend (Express + TypeScript)             ║
        ╠═════════════════════════════════════════════╣
        ║ Controllers: Auth, Food, Food Partner       ║
        ║ Middleware: Authentication, Error Handling  ║
        ║ Services: Storage (ImageKit)                ║
        ║ Routes: /api/auth, /api/food,               ║
        ║         /api/food-partner                   ║
        ╚════════════════════╤════════════════════════╝
                            │
                            │ Mongoose ODM
                            ▼
        ╔════════════════════════════════════════════╗
        ║  Database (MongoDB - Cloud/Local)          ║
        ╠════════════════════════════════════════════╣
        ║ Collections: Users, FoodPartners,          ║
        ║             Foods, Likes, Saves            ║
        ╚════════════════════════════════════════════╝
```

### **Data Flow**

```
User Request → Route Handler → Middleware (Auth) → Controller
   → Service/Database Logic → Response → Client
```

---

## 📁 Folder Structure

### Backend Structure

```
backend/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── db/
│   │   └── db.ts             # MongoDB connection
│   ├── controller/            # Request handlers
│   │   ├── auth.controller.ts      # User & Partner Auth
│   │   ├── food.controller.ts      # Food CRUD operations
│   │   └── food-partner.controller.ts # Partner operations
│   ├── models/               # Mongoose Schemas
│   │   ├── user.model.ts          # User schema
│   │   ├── foodpartner.model.ts   # Food Partner schema
│   │   ├── food.model.ts          # Food items schema
│   │   ├── likes.model.ts         # Likes tracking
│   │   └── save.model.ts          # Saved items
│   ├── routes/               # API Routes
│   │   ├── auth.route.ts          # Auth endpoints
│   │   ├── food.route.ts          # Food endpoints
│   │   └── food-partner.route.ts  # Partner endpoints
│   ├── middlewares/          # Custom Middleware
│   │   └── auth.middleware.ts     # JWT verification
│   └── services/             # Business Logic
│       └── storage.service.ts    # ImageKit integration
├── server.ts                 # Server entry point
├── package.json
├── tsconfig.json
└── .env                      # Environment variables
```

### Frontend Structure

```
web/
├── src/
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Root component
│   ├── index.css             # Global styles
│   ├── pages/                # Page components
│   │   ├── general/
│   │   │   ├── Home.tsx      # Browse food items
│   │   │   └── Saved.tsx     # Saved favorites
│   │   ├── user/
│   │   │   ├── UserLogin.tsx
│   │   │   └── UserRegister.tsx
│   │   ├── partner/
│   │   │   ├── PartnerLogin.tsx
│   │   │   └── PartnerRegister.tsx
│   │   └── food-partner/
│   │       ├── CreateFoodPartner.tsx  # Add food items
│   │       └── Profile.tsx            # Partner profile
│   ├── routes/
│   │   └── AppRoutes.tsx             # Route configuration
│   ├── hooks/                # Custom React Hooks
│   │   ├── useAuth.ts            # Auth logic
│   │   ├── useFood.ts            # Food data
│   │   └── useSaves.ts           # Saved items
│   ├── types/                # TypeScript Definitions
│   │   ├── api.types.ts      # API response types
│   │   ├── models.types.ts   # Data models
│   │   └── storage.types.ts  # Storage types
│   └── utils/                # Utility Functions
│       ├── api.ts            # Axios instance & API calls
│       ├── storage.ts        # ImageKit configuration
│       └── validation.ts     # Form validation
├── vite.config.ts
├── tsconfig.json
├── eslint.config.ts
└── package.json
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (Cloud Atlas or Local)
- ImageKit Account (for image management)

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
EOF

# Start development server
npm run dev

# Server runs on http://localhost:3000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd web

# Install dependencies
npm install

# Start development server
npm run dev

# Application opens on http://localhost:5173
```

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### User Authentication

- `POST /api/auth/user/register` - Register new user

  ```json
  {
    "fullName": "John Doe",
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```

- `POST /api/auth/user/login` - User login

  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```

- `GET /api/auth/user/logout` - User logout

#### Food Partner Authentication

- `POST /api/auth/food-partner/register` - Register restaurant
- `POST /api/auth/food-partner/login` - Partner login
- `GET /api/auth/food-partner/logout` - Partner logout

### Food Routes (`/api/food`)

- `GET /api/food` - Get all food items
- `GET /api/food/:id` - Get single food item
- `POST /api/food/like` - Like a food item
- `GET /api/food/likes` - Get user's liked items

### Food Partner Routes (`/api/food-partner`)

- `POST /api/food-partner/create` - Create food item
- `GET /api/food-partner/:id` - Get partner profile
- `PUT /api/food-partner/:id` - Update partner profile
- `DELETE /api/food-partner/:id` - Delete food item
- `GET /api/food-partner/saves` - Get saved items

---

## 💾 Database Models

### User Model

```typescript
{
  fullName: String (required),
  email: String (required, unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Food Partner Model

```typescript
{
  partnerName: String (required),
  email: String (required, unique),
  password: String (hashed),
  location: String,
  cuisineType: [String],
  phone: String,
  profileImage: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Food Model

```typescript
{
  foodName: String (required),
  description: String,
  price: Number (required),
  cuisine: String,
  image: String,
  foodPartnerId: ObjectId (ref: FoodPartner),
  rating: Number,
  preparationTime: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Likes Model

```typescript
{
  userId: ObjectId (ref: User),
  foodId: ObjectId (ref: Food),
  createdAt: Date
}
```

### Save Model

```typescript
{
  userId: ObjectId (ref: User),
  foodId: ObjectId (ref: Food),
  createdAt: Date
}
```

---

## ▶️ Running the Application

### Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
# Output: App listening on port - 3000
```

**Terminal 2 - Frontend:**

```bash
cd web
npm run dev
# Output: VITE v7.2.4 ready in XXX ms
# ➜  Local:   http://localhost:5173/
```

### Production Build

**Backend:**

```bash
npm run build
npm start
```

**Frontend:**

```bash
npm run build
npm preview
```

---

## 🔐 Authentication Flow

1. **User Registration/Login:**
   - User submits credentials
   - Backend validates and creates/retrieves user
   - JWT token generated and stored in secure HTTP-only cookie
   - User redirected to home page

2. **Protected Routes:**
   - Frontend checks for valid token in cookies
   - Middleware validates JWT on backend
   - Access granted/denied based on token validity

3. **Food Partner Operations:**
   - Partner logs in with separate authentication
   - Can only manage their own food items
   - Middleware verifies partner ownership

---

## 📝 Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/zomato
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
PORT=3000

# ImageKit Configuration
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/youraccountid
```

---

## 🎯 Key Features Implementation

### Image Management

- Uses **ImageKit** for reliable image storage and optimization
- Integrated in `services/storage.service.ts`
- Supports image transformation and CDN delivery

### Security Features

- **Bcrypt** password hashing for secure storage
- **JWT** tokens for stateless authentication
- **CORS** configured to prevent unauthorized access
- **HTTP-only cookies** for token storage

### State Management

- Custom React hooks (`useAuth`, `useFood`, `useSaves`)
- Context API for global state
- Axios interceptors for API calls

---

## 📦 Project Dependencies Summary

| Category     | Count   | Tech                                     |
| ------------ | ------- | ---------------------------------------- |
| **Backend**  | 12 deps | Express, Mongoose, JWT, Bcrypt, ImageKit |
| **Frontend** | 5 deps  | React, React Router, Axios, Tailwind CSS |
| **DevTools** | 8 deps  | TypeScript, ESLint, Vite, TSX            |

---

## 📄 License

This project is licensed under the ISC License.

---

**Happy Coding! 🚀**

Built with ❤️ using TypeScript, React, and Express.js
