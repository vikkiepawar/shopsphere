const Cart = require("../models/Cart");

// Add to Cart
const addToCart = async (req, res) => {
  try {

    const { product, quantity } = req.body;

    const cart = await Cart.create({
      user: req.user.id,
      product,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Added to Cart",
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Cart
const getCart = async (req, res) => {

  try {

    const cart = await Cart.find({ user: req.user.id })
      .populate("product");

    res.json({
      success: true,
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  addToCart,
  getCart,
};
