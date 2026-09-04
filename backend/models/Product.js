const mongoose = require("mongoose");

const emiPlanSchema = new mongoose.Schema(
  {
    monthlyPayment: {
      type: Number,
      required: true,
    },
    tenure: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    cashback: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    emiPlans: {
      type: [emiPlanSchema],
      required: true,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    variants: {
      type: [variantSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);  