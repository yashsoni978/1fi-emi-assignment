# 1Fi EMI Product Application

A full-stack product browsing and EMI selection application built as part of the 1Fi SDE1 assignment.

The application allows users to browse smartphones, select product variants, view pricing, choose EMI plans, and proceed with their selected plan.

## Features

- Product listing page
- Product detail pages with unique URLs
- Multiple product variants
- Dynamic pricing and product images
- Multiple EMI plans per variant
- EMI plan selection
- Monthly payment, tenure, interest rate and cashback details
- Total EMI payable calculation
- EMI confirmation state
- Loading skeletons
- API error states
- 404 page
- Responsive UI
- MongoDB-backed product data
- REST APIs for products

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS

### Backend

- Node.js
- Express.js
- Mongoose

### Database

- MongoDB Atlas

## Project Structure

```text
1fi-emi-assignment/
│
├── backend/
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── seed.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Products.jsx
│   │   │   └── ProductDetails.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Database Schema

The MongoDB database contains a `Product` collection.

Each product contains:

- Product name
- Multiple variants

Each variant contains:

- Variant name
- MRP
- Selling price
- Product image
- EMI plans

Each EMI plan contains:

- Monthly payment
- Tenure
- Interest rate
- Cashback

The schema is implemented using Mongoose in:

```text
backend/models/Product.js
```

## API Endpoints

### Get all products

```http
GET /api/products
```

Returns all products stored in MongoDB.

### Get a single product

```http
GET /api/products/:id
```

Returns a specific product using its MongoDB ID.

### Backend health check

```http
GET /
```

Returns:

```json
{
  "message": "1Fi EMI API is running"
}
```

## Seed Data

The project includes seed data containing:

- 3 smartphones
- 2 variants for each smartphone
- 2 EMI plans for each variant

The seed script is located at:

```text
backend/seed.js
```

To seed the database:

```bash
cd backend
node seed.js
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/yashsoni978/1fi-emi-assignment.git
cd 1fi-emi-assignment
```

### 2. Setup the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Setup the frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Production Build

To create the frontend production build:

```bash
cd frontend
npm run build
```

## Environment Variables

Environment variables are intentionally excluded from Git.

### Backend

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Frontend

```env
VITE_API_URL=http://localhost:5000
```

Never commit actual database credentials or secrets to the repository.

## Application Flow

```text
User
  ↓
Products Page
  ↓
Select Product
  ↓
Product Details
  ↓
Select Variant
  ↓
Select EMI Plan
  ↓
Review EMI Details
  ↓
Proceed with EMI
```

## API → Database Flow

```text
React Frontend
      ↓
Express REST API
      ↓
Mongoose
      ↓
MongoDB Atlas
```

Product information, pricing, images and EMI plans are retrieved from the backend API rather than being hardcoded in the frontend.

## Author

Yashwardhan Soni

GitHub: https://github.com/yashsoni978
