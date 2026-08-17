const express = require("express");

const router = express.Router();

const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, getCart);

router.post("/add", protect, addToCart);

router.put("/:productId", protect, updateCartItem);

router.delete("/:productId", protect, removeFromCart);

router.delete("/", protect, clearCart);

module.exports = router;
