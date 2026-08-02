const Order = require("../models/Order");
const Cart = require("../models/Cart");

const placeOrder = async (req, res) => {
  try {

    const cart = await Cart.find({ user: req.user.id }).populate("product");

    if (cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is Empty",
      });
    }

    let total = 0;

    const items = cart.map((item) => {
      total += item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
      };
    });

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount: total,
    });

    await Cart.deleteMany({ user: req.user.id });

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({ user: req.user.id })
      .populate("items.product");

    res.json({
      success: true,
      orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  placeOrder,
  getMyOrders,
};
