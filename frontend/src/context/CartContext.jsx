import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../services/cartService";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);

      const response = await getCart();

      const items = response?.data?.cart?.items || [];

      setCartItems(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error(
        "Load cart error:",
        error.response?.data || error.message
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        setCartItems([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

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
  }, [loadCart]);

  const addItem = async (productId, quantity = 1) => {
    if (!localStorage.getItem("token")) {
      throw new Error("Please login to add products to cart");
    }

    if (!productId) {
      throw new Error("Product ID is required");
    }

    try {
      setLoading(true);

      const response = await addToCart(productId, quantity);

      const items = response?.data?.cart?.items || [];

      setCartItems(Array.isArray(items) ? items : []);

      return response.data;
    } catch (error) {
      console.error(
        "Add cart error:",
        error.response?.data || error.message
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (productId, quantity) => {
    if (!localStorage.getItem("token")) {
      throw new Error("Please login to update your cart");
    }

    if (!productId) {
      throw new Error("Product ID is required");
    }

    if (quantity <= 0) {
      return removeItem(productId);
    }

    try {
      setLoading(true);

      const response = await updateCartItem(
        productId,
        quantity
      );

      const items = response?.data?.cart?.items || [];

      setCartItems(Array.isArray(items) ? items : []);

      return response.data;
    } catch (error) {
      console.error(
        "Update cart error:",
        error.response?.data || error.message
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    if (!localStorage.getItem("token")) {
      throw new Error("Please login to remove cart items");
    }

    try {
      setLoading(true);

      const response = await removeFromCart(productId);

      const items = response?.data?.cart?.items || [];

      setCartItems(Array.isArray(items) ? items : []);

      return response.data;
    } catch (error) {
      console.error(
        "Remove cart error:",
        error.response?.data || error.message
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearAll = async () => {
    if (!localStorage.getItem("token")) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);

      await clearCart();

      setCartItems([]);
    } catch (error) {
      console.error(
        "Clear cart error:",
        error.response?.data || error.message
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.product?.price || 0);
      const quantity = Number(item.quantity || 0);

      return total + price * quantity;
    }, 0);
  }, [cartItems]);

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

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider"
    );
  }

  return context;
}
