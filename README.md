# Jewellery E-Commerce Platform

A full-stack jewellery e-commerce web application built using the MERN stack, designed to provide a seamless online shopping experience with secure authentication, dynamic product management, responsive UI, and optimized performance.

The platform includes separate modules for users and admins, allowing customers to browse and purchase jewellery products while admins can manage inventory, orders, and website content efficiently.

---

# Features

## User Features

* User registration and login authentication
* JWT-based secure authentication and authorization
* Browse jewellery products with category filtering
* Product sorting functionality
* Add to cart and wishlist functionality
* Secure checkout and payment integration
* Responsive UI for desktop and mobile devices
* Lazy loading for faster page rendering
* Pagination for efficient product handling

## Admin Features

* Admin dashboard
* Add, update, and delete products
* Manage orders and users
* Upload and manage product images
* Inventory management system
* Dynamic content and pricing management

---

# Tech Stack

## Frontend

* React.js
* Tailwind CSS
* JavaScript
* Axios

## Backend

* Node.js
* Express.js
* REST APIs

## Database

* MongoDB
* Mongoose

## Authentication & Security

* JWT Authentication
* bcrypt
* Protected Routes

## Additional Tools & Concepts

* Multer 
* Razorpay Integration
* Lazy Loading
* Pagination
* Git & GitHub

---

# Project Structure

```bash
Jewellery-Ecommerce/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── Frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── public/
│
├── .gitignore
├── README.md
└── package.json
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/your-username/repository-name.git
```

## Navigate to Project Folder

```bash
cd repository-name
```

---

# Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside Backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend server:

```bash
npx nodemon
```

---

# Frontend Setup

```bash
cd Frontend
npm install
```

If using Vite:

```env
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

# Performance Optimizations

* Implemented Lazy Loading for faster initial rendering
* Added Pagination for efficient product and data handling
* Optimized backend queries and API responses
* Responsive design for better accessibility across devices

---

# Future Improvements

* Product reviews and ratings
* Real-time order tracking
* AI-based product recommendation system
* Email notifications
* Advanced analytics dashboard

---

# Purpose of Project

This project was developed to strengthen full-stack development skills by implementing real-world e-commerce functionalities, scalable backend architecture, optimized frontend performance, and secure authentication systems.

---

# Author

Kartik Jangid
