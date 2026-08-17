import { useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalItems,
    totalPrice,
    updateItem,
    removeItem,
    clearAll,
  } = useCart();

  const increase = async (productId) => {
    const item = cartItems.find(
      (item) => item.product._id === productId
    );

    if (item) {
      await updateItem(productId, item.quantity + 1);
    }
  };

  const decrease = async (productId) => {
    const item = cartItems.find(
      (item) => item.product._id === productId
    );

    if (item && item.quantity > 1) {
      await updateItem(productId, item.quantity - 1);
    } else {
      await removeItem(productId);
    }
  };

  const handleRemove = async (productId) => {
    await removeItem(productId);
    toast.success("Item removed");
  };

  const handleClear = async () => {
    await clearAll();
    toast.success("Cart cleared");
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24">
        <ShoppingBag
          size={70}
          className="mx-auto text-gray-300"
        />

        <h1 className="text-3xl font-bold mt-6">
          Your cart is empty
        </h1>

        <p className="text-gray-500 mt-2">
          Add some products to get started.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 bg-blue-600 text-white px-7 py-3 rounded-xl"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Shopping Cart
          </h1>

          <p className="text-gray-500 mt-2">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={handleClear}
          className="flex items-center gap-2 text-red-500"
        >
          <Trash2 size={18} />
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          {cartItems.map((item) => (
            <CartItem
              key={item.product._id}
              item={item}
              onIncrease={increase}
              onDecrease={decrease}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="text-2xl font-bold">
            Order Summary
          </h2>

          <div className="flex justify-between mt-6">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="flex justify-between mt-4">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between mt-4">
            <span>Delivery</span>
            <span className="text-green-600">
              FREE
            </span>
          </div>

          <hr className="my-6" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-7 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
