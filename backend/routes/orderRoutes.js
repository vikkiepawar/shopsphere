const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);

router.get("/my", protect, getMyOrders);

module.exports = router;
