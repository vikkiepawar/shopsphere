const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createProduct);

router.get("/", getProducts);

module.exports = router;
