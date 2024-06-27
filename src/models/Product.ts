import { Category } from "../enum";

const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  name: String,
  description: String,
  price: String,
  image: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Product;
