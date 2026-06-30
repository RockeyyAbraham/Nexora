# Nexora
# 🥛 Dairy Management System

A MERN Stack based Dairy Management System developed as a college mini project. The application provides a simple CRUD-based platform for customers to browse dairy products, place orders, and manage their profiles, while administrators can efficiently manage products, users, and customer orders.

---

## 📌 Project Overview

The Dairy Management System is designed to simplify the management of dairy products and customer orders through a secure web application.

The system consists of two user roles:

- Customer
- Administrator

Customers can browse available dairy products, add items to their cart, place orders using Cash on Delivery, view previous orders, and update their profile.

Administrators can manage products, monitor users, process customer orders, and view dashboard statistics.

---

## 🚀 Features

### Customer

- User Registration
- User Login
- JWT Authentication
- Browse Dairy Products
- View Product Details
- Add Products to Cart
- Update Cart Quantity
- Remove Products from Cart
- Checkout (Cash on Delivery)
- Place Orders
- View Order History
- Update Profile

---

### Administrator

- Secure Admin Login
- Dashboard Statistics
- Manage Products (CRUD)
- View Registered Users
- Delete Users
- View Customer Orders
- Update Order Status

---

## 🗄 Database Collections

The application uses three MongoDB collections:

- Users
- Products
- Orders

---

## 🔐 Authentication

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization
- Single Login Page
- One Seeded Admin Account

---

## 🔄 Workflow

Customer

```
Register/Login
        ↓
Browse Products
        ↓
Add to Cart
        ↓
Checkout
        ↓
Place Order
        ↓
Order History
```

Administrator

```
Login
      ↓
Dashboard
      ↓
Manage Products
      ↓
Manage Users
      ↓
Manage Orders
```

---



## ⚙ Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

PROJECT LINK--http://34.41.145.183/

This project is developed for educational purposes as part of a college MERN Stack mini project.
