<div align="center">

<img src="frontend/src/assets/logo.png" alt="ShopNest Logo" width="120" height="120"/>

# 🛍️ ShopNest

### A Full-Stack E-Commerce Platform built with the MERN Stack

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![PayPal](https://img.shields.io/badge/PayPal-003087?style=for-the-badge&logo=paypal&logoColor=white)](https://developer.paypal.com)

![GitHub repo size](https://img.shields.io/github/repo-size/satya-siva-prasad-yanamadala/ShopNest?color=6e40c9&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/satya-siva-prasad-yanamadala/ShopNest?color=6e40c9&style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/satya-siva-prasad-yanamadala/ShopNest?style=flat-square&color=6e40c9)

<br/>

> **ShopNest** is a production-ready, full-stack ecommerce application showcasing complete MERN stack expertise — from RESTful API design and JWT authentication to React state management and PayPal payment integration.

</div>

---

## 📸 Screenshots

| Home Page | Product Page | Order Page |
|-----------|-------------|------------|
| Browse products with carousel | View details & reviews | Track order & payment status |

---

## ✨ Features

### 🛒 Shopping Experience
- 🔍 **Product Search** — Full-text search with keyword filtering
- ⭐ **Product Reviews & Ratings** — User-submitted reviews with star ratings
- 🎠 **Top Products Carousel** — Dynamic featured products slider
- 📄 **Pagination** — Efficient browsing across large product catalogs
- 🛒 **Shopping Cart** — Persistent cart with quantity management

### 🔐 Authentication & Security
- 🔑 **JWT Authentication** — Secure token-based auth with HTTP-only cookies
- 👤 **User Registration & Login** — Full auth flow with profile management
- 🛡️ **Protected Routes** — Role-based access control (Admin vs Customer)
- 🔒 **Password Hashing** — bcryptjs encryption for user credentials

### 💳 Checkout & Payments
- 📦 **Multi-Step Checkout** — Shipping → Payment → Review → Place Order
- 💰 **PayPal Integration** — Sandbox & live payment processing
- 🧾 **Order History** — Full order tracking with status updates
- 📬 **Admin Order Management** — Mark orders as paid or delivered

### 🛠️ Admin Dashboard
- 📋 **Product Management** — Create, edit, delete products with image upload
- 👥 **User Management** — View and manage all registered users
- 📦 **Order Management** — View all orders, update delivery status
- 🌱 **Database Seeder** — Seed sample products and users for demo

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework with hooks |
| **Redux Toolkit** | Global state management |
| **RTK Query** | Data fetching & caching |
| **React Router v6** | Client-side routing |
| **React Bootstrap** | Responsive UI components |
| **PayPal React SDK** | Payment integration |
| **React Toastify** | Toast notifications |
| **React Helmet** | Dynamic SEO meta tags |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | RESTful API framework |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Multer** | File upload handling |
| **dotenv** | Environment configuration |
| **Nodemon** | Development hot-reload |

---

## 🗂️ Project Structure

```
ShopNest/
├── 📁 backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route handlers (orders, products, users)
│   ├── data/            # Sample seed data
│   ├── middleware/      # Auth, error handling, async wrapper
│   ├── models/          # Mongoose schemas (Order, Product, User)
│   ├── routes/          # API route definitions
│   ├── utils/           # JWT, PayPal, price calculations
│   └── server.js        # Express app entry point
│
├── 📁 frontend/
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── screens/     # Page-level components
│       │   └── admin/   # Admin dashboard screens
│       ├── slices/      # Redux state & RTK Query API slices
│       ├── utils/       # Cart utilities
│       └── App.js       # Root component with routing
│
├── 📁 uploads/          # Product image storage
├── .env.example         # Environment variable template
└── package.json         # Root scripts (dev, build, seed)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- npm `v9+`
- MongoDB Atlas account (or local MongoDB)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/satya-siva-prasad-yanamadala/ShopNest.git
cd ShopNest
```

### 2️⃣ Configure Environment Variables

Rename `.env.example` to `.env` and fill in the values:

```env
NODE_ENV=development
PORT=5000

# MongoDB Atlas connection string
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ShopNest

# JWT secret key
JWT_SECRET=your_super_secret_key

# PayPal credentials (from developer.paypal.com)
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_APP_SECRET=your_paypal_app_secret
PAYPAL_API_URL=https://api-m.sandbox.paypal.com

# Products per page
PAGINATION_LIMIT=8
```

> ⚠️ **Note:** If your password contains special characters (like `@`), URL-encode them (e.g. `@` → `%40`)

### 3️⃣ Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### 4️⃣ Seed the Database (Optional)

```bash
# Import sample products & users
npm run data:import

# Clear all data
npm run data:destroy
```

### 5️⃣ Run the Application

```bash
# Run frontend (port 3000) & backend (port 5000) concurrently
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 🔌 API Endpoints

### Products
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products (paginated) | Public |
| GET | `/api/products/:id` | Get single product | Public |
| GET | `/api/products/top` | Get top-rated products | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |
| POST | `/api/products/:id/reviews` | Add review | Private |

### Users
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users` | Register user | Public |
| POST | `/api/users/auth` | Login user | Public |
| POST | `/api/users/logout` | Logout user | Private |
| GET | `/api/users/profile` | Get profile | Private |
| PUT | `/api/users/profile` | Update profile | Private |
| GET | `/api/users` | Get all users | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |

### Orders
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Create order | Private |
| GET | `/api/orders/mine` | Get my orders | Private |
| GET | `/api/orders/:id` | Get order by ID | Private |
| PUT | `/api/orders/:id/pay` | Update to paid | Private |
| PUT | `/api/orders/:id/deliver` | Update to delivered | Admin |
| GET | `/api/orders` | Get all orders | Admin |

---

## 👥 Demo Accounts

```
👑 Admin Account
   Email:    admin@email.com
   Password: 123456

👤 Customer Account
   Email:    john@email.com
   Password: 123456
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend & backend in development |
| `npm run server` | Start backend only (with nodemon) |
| `npm run client` | Start frontend only |
| `npm run build` | Build frontend for production |
| `npm run data:import` | Seed database with sample data |
| `npm run data:destroy` | Clear all database data |

---

## 📦 Deployment

```bash
# Create production build
npm run build

# Start production server
npm start
```

> The Express server serves the built React app in production mode from the `/frontend/build` directory.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### 👨‍💻 Built by [Satya Siva Prasad Yanamadala](https://github.com/satya-siva-prasad-yanamadala)

*Showcasing full-stack MERN development — from database design to UI/UX*

⭐ **Star this repo** if you found it useful!

[![GitHub Follow](https://img.shields.io/github/followers/satya-siva-prasad-yanamadala?style=social)](https://github.com/satya-siva-prasad-yanamadala)

</div>
