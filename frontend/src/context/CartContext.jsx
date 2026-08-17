```jsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
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

  // ----------------------------------------
  // Get token
  // ----------------------------------------
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // ----------------------------------------
  // Safely extract cart items
  // ----------------------------------------
  const extractCartItems = (response) => {
    return response?.data?.cart?.items || [];
  };

  // ----------------------------------------
  // LOAD CART
  // ----------------------------------------
  const loadCart = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);

      const response = await getCart();

      const items = extractCartItems(response);

      setCartItems(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error(
        "Load cart error:",
        error.response?.data || error.message
      );

      // Only clear local cart if authentication is invalid
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

  // ----------------------------------------
  // ADD ITEM
  // ----------------------------------------
  const addItem = async (productId, quantity = 1) => {
    const token = getToken();

    if (!token) {
      throw new Error("Please login to add products to your cart");
    }

    if (!productId) {
      throw new Error("Product ID is required");
    }

    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    try {
      setLoading(true);

      const response = await addToCart(productId, quantity);

      const items = extractCartItems(response);

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

  // ----------------------------------------
  // UPDATE ITEM
  // ----------------------------------------
  const updateItem = async (productId, quantity) => {
    const token = getToken();

    if (!token) {
      throw new Error("Please login to update your cart");
    }

    if (!productId) {
      throw new Error("Product ID is required");
    }

    if (quantity < 1) {
      return removeItem(productId);
    }

    try {
      setLoading(true);

      const response = await updateCartItem(
        productId,
        quantity
      );

      const items = extractCartItems(response);

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

  // ----------------------------------------
  // REMOVE ITEM
  // ----------------------------------------
  const removeItem = async (productId) => {
    const token = getToken();

    if (!token) {
      throw new Error("Please login to remove items");
    }

    if (!productId) {
      throw new Error("Product ID is required");
    }

    try {
      setLoading(true);

      const response = await removeFromCart(productId);

      const items = extractCartItems(response);

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

  // ----------------------------------------
  // CLEAR CART
  // ----------------------------------------
  const clearAll = async () => {
    const token = getToken();

    if (!token) {
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

  // ----------------------------------------
  // AUTH / STORAGE CHANGE
  // ----------------------------------------
  useEffect(() => {
    loadCart();

    const handleStorageChange = (event) => {
      if (event.key === "token") {
        loadCart();
      }
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, [loadCart]);

  // ----------------------------------------
  // TOTAL ITEMS
  // ----------------------------------------
  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + Number(item.quantity || 0);
    }, 0);
  }, [cartItems]);

  // ----------------------------------------
  // TOTAL PRICE
  // ----------------------------------------
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.product?.price || 0);
      const quantity = Number(item.quantity || 0);

      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  // ----------------------------------------
  // CONTEXT VALUE
  // ----------------------------------------
  const value = {
    cartItems,
    loading,
    totalItems,
    totalPrice,

    addItem,
    updateItem,
    removeItem,
    clearAll,
    loadCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// ----------------------------------------
// useCart Hook
// ----------------------------------------
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider"
    );
  }

  return context;
}
```

