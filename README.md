# Inventory Management System


## Problem Statement

Most small and medium material businesses lack real-time visibility into their inventory. This often leads to:

- Overstocking of slow-moving items  
- Frequent stock-outs of critical products  
- Accumulation of dead inventory  
- Damaged goods going unnoticed  
- Low confidence in scaling operations  

The objective of this project is to build a simple, practical, and extensible inventory management system that improves inventory visibility and operational decision-making.


## Solution Overview

This project provides a centralized inventory dashboard that allows users to manage products, track stock levels, and quickly identify inventory issues such as low stock, out-of-stock items, and damaged goods.

The solution focuses on clarity, usability, and future scalability rather than over-engineering.


## Tech Stack

### Frontend

- Next.js (App Router)
- React Hooks
- Inline CSS
- Responsive design for desktop and mobile


### Backend

- Node.js
- Express.js
- RESTful APIs


### Database

- MongoDB Atlas
- Mongoose ODM


## Key Features


### Inventory Dashboard

- Displays all products with name, SKU, quantity, and status
- Dark-themed UI for improved readability


### Stock Status Detection

Products are automatically classified as:

- **IN STOCK** – Quantity greater than or equal to minimum stock  
- **LOW STOCK** – Quantity below minimum stock  
- **OUT OF STOCK** – Quantity equals zero  
- **DAMAGED** – Manually flagged for replacement  


### Filtering

Inventory can be filtered based on:

- All products
- In Stock
- Low Stock
- Out of Stock
- Damaged inventory


### Inventory Operations

- Add new products
- Update stock quantities
- Delete obsolete products
- Immediate UI updates after each action


### Responsive Design

- Optimized for screens below 425px
- Horizontal scrolling for tables on small devices
- Single-line rows to prevent layout breakage


## Setup Instructions


### Clone the Repository


## Setup Instructions

### Clone the Repository


Start the backend server:
```bash
cd backend
node index.js
```
Frontend Setup:
```bash
npm install
npm run dev

```
The application will be available at:

http://localhost:3000
