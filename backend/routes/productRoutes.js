const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
module.exports = router;