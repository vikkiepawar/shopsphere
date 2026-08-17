import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);

      const res = await getCart();

      setCartItems(res.data?.cart?.items || []);
    } catch (error) {
      console.error("Load cart error:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();

    const handleStorageChange = (event) => {
      if (event.key === "token") {
        loadCart();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  const addItem = async (productId, quantity = 1) => {
    try {
      const res = await addToCart(productId, quantity);

      setCartItems(res.data?.cart?.items || []);

      return res.data;
    } catch (error) {
      console.error("Add cart error:", error);
      throw error;
    }
  };

  const updateItem = async (productId, quantity) => {
    try {
      const res = await updateCartItem(productId, quantity);

      setCartItems(res.data?.cart?.items || []);
    } catch (error) {
      console.error("Update cart error:", error);
      throw error;
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await removeFromCart(productId);

      setCartItems(res.data?.cart?.items || []);
    } catch (error) {
      console.error("Remove cart error:", error);
      throw error;
    }
  };

  const clearAll = async () => {
    try {
      await clearCart();

      setCartItems([]);
    } catch (error) {
      console.error("Clear cart error:", error);
      throw error;
    }
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        totalItems,
        totalPrice,
        addItem,
        updateItem,
        removeItem,
        clearAll,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
