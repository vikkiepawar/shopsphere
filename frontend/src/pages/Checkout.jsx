import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useCart } from "../context/CartContext";
import API from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, totalPrice, clearAll } = useCart();

  const [form, setForm] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!cartItems.length) {
      toast.error("Cart is empty");
      return;
    }

    try {
      await API.post("/orders", {
        items: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalAmount: totalPrice,
        shippingAddress: form,
      });

      await clearAll();

      toast.success("Order placed successfully");

      navigate("/orders");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to place order"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <form
        onSubmit={handlePlaceOrder}
        className="bg-white rounded-2xl shadow p-8 space-y-5"
      >
        <input
          name="address"
          placeholder="Full Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-4 py-3"
        />

        <div className="border-t pt-5">
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-semibold"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
