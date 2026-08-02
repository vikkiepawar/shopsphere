const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  placeOrder,
  getMyOrders,
} = require("../controllers/orderController");

router.post("/", protect, placeOrder);

router.get("/", protect, getMyOrders);

module.exports = router;
