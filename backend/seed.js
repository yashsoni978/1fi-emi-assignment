require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    name: "iPhone 15",
    variants: [
      {
        name: "128GB",
        mrp: 79900,
        price: 69900,
        image:
          "https://images.unsplash.com/photo-1696446701796-da61225697cc",
        emiPlans: [
          {
            monthlyPayment: 5833,
            tenure: 12,
            interestRate: 0,
            cashback: 2000,
          },
          {
            monthlyPayment: 2917,
            tenure: 24,
            interestRate: 10,
            cashback: 3000,
          },
        ],
      },
      {
        name: "256GB",
        mrp: 89900,
        price: 79900,
        image:
          "https://images.unsplash.com/photo-1696446701796-da61225697cc",
        emiPlans: [
          {
            monthlyPayment: 6667,
            tenure: 12,
            interestRate: 0,
            cashback: 2500,
          },
          {
            monthlyPayment: 3333,
            tenure: 24,
            interestRate: 10,
            cashback: 3500,
          },
        ],
      },
    ],
  },

  {
    name: "Samsung Galaxy S24",
    variants: [
      {
        name: "128GB",
        mrp: 79999,
        price: 69999,
        image:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
        emiPlans: [
          {
            monthlyPayment: 5833,
            tenure: 12,
            interestRate: 0,
            cashback: 2000,
          },
          {
            monthlyPayment: 2917,
            tenure: 24,
            interestRate: 10,
            cashback: 3000,
          },
        ],
      },
      {
        name: "256GB",
        mrp: 89999,
        price: 79999,
        image:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
        emiPlans: [
          {
            monthlyPayment: 6667,
            tenure: 12,
            interestRate: 0,
            cashback: 2500,
          },
          {
            monthlyPayment: 3333,
            tenure: 24,
            interestRate: 10,
            cashback: 3500,
          },
        ],
      },
    ],
  },

  {
    name: "OnePlus 13",
    variants: [
      {
        name: "256GB",
        mrp: 74999,
        price: 64999,
        image:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
        emiPlans: [
          {
            monthlyPayment: 5417,
            tenure: 12,
            interestRate: 0,
            cashback: 2000,
          },
          {
            monthlyPayment: 2708,
            tenure: 24,
            interestRate: 10,
            cashback: 3000,
          },
        ],
      },
      {
        name: "512GB",
        mrp: 84999,
        price: 74999,
        image:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
        emiPlans: [
          {
            monthlyPayment: 6250,
            tenure: 12,
            interestRate: 0,
            cashback: 2500,
          },
          {
            monthlyPayment: 3125,
            tenure: 24,
            interestRate: 10,
            cashback: 3500,
          },
        ],
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products seeded successfully");

    await mongoose.connection.close();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();