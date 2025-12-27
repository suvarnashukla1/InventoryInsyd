## Inventory Management System
# Problem Statement

Most small and medium material businesses lack real-time visibility into their inventory. This often leads to overstocking, frequent stock-outs, accumulation of dead inventory, unnoticed damaged goods, and poor confidence in scaling operations.
The objective of this project is to design and implement a simple, practical, and extensible inventory management system that improves inventory visibility and operational decision-making.

# Solution Overview

This project provides a centralized inventory dashboard that allows users to manage products, track stock levels, and quickly identify inventory issues such as low stock, out-of-stock items, and damaged goods.

The solution prioritizes clarity and usability while keeping the system flexible for future expansion.

# Tech Stack
Frontend

Next.js (App Router)

React Hooks

Inline CSS

Responsive layout for desktop and mobile

Backend

Node.js

Express.js

RESTful APIs

Database

MongoDB Atlas

Mongoose ODM

# Key Features
Inventory Dashboard

Displays all products with name, SKU, quantity, and stock status

Clean dark-themed UI for improved readability

Stock Status Detection

Products are automatically classified as:

IN STOCK – Quantity greater than or equal to minimum stock

LOW STOCK – Quantity below minimum stock

OUT OF STOCK – Quantity equals zero

DAMAGED – Manually flagged for replacement

Filtering

Inventory can be filtered based on:

All products

In Stock

Low Stock

Out of Stock

Damaged inventory

Inventory Operations

Add new products

Update stock quantities

Delete obsolete products

Immediate UI updates after actions

Responsive Design

Optimized for mobile screens below 425px

Horizontal scrolling for tables on smaller devices

Single-line rows to maintain layout consistency

# Project Structure
inventory/
│
├── app/
│   ├── page.js
│   ├── add-product/page.js
│   ├── update-stock/[id]/page.js
│
├── backend/
│   ├── index.js
│   ├── .env
│
├── .gitignore
├── README.md

# API Endpoints
Method	Endpoint	Description
GET	/products	Fetch all products
POST	/products	Add a new product
PUT	/products/:id	Update product quantity
DELETE	/products/:id	Delete a product
Setup Instructions
Clone the Repository
git clone https://github.com/<your-username>/inventory-management-system.git
cd inventory-management-system

# Backend Setup
cd backend
npm install


Create a .env file inside the backend folder:

MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000


Start the backend server:

node index.js

Frontend Setup
cd ..
npm install
npm run dev


# The application will be available at:

http://localhost:3000

Security Considerations

Database credentials are stored in environment variables

.env files are excluded from version control using .gitignore

No secrets are committed to the repository

Design Decisions

Inline CSS is used for transparency and ease of review

No external UI frameworks are used to keep dependencies minimal

Damaged inventory marking is handled at the UI level to avoid premature schema complexity

REST architecture is chosen for simplicity and scalability

# Assumptions

Single business inventory

Single user managing the inventory

Manual marking for damaged items

Stable internet connection

# Future Scope and Enhancements

User authentication and authorization

Separate inventories per user or organization

Persist damaged inventory status in the database

Inventory analytics and trend reporting

Automated low-stock alerts

Export inventory reports to CSV or PDF

Audit logs for stock changes

Cloud deployment and CI/CD pipeline
