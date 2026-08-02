import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchCart() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await API.get("/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Cart API Response:", res.data);

        setCartItems(res.data.cart || []);

        console.log("API Cart:", res.data.cart);
        console.log("API Length:", res.data.cart.length);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [token]);

  const placeOrder = async () => {
    try {
      const res = await API.post(
        "/orders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Cart API Response:", res.data);

      alert(res.data.message);

      setCartItems([]);
    } catch (err) {
      alert(err.response?.data?.message || "Order Failed");
    }
  };

console.log("Rendered cartItems:", cartItems);
console.log("Rendered length:", cartItems.length);

  if (loading) return <h2>Loading...</h2>;

  if (!token) return <h2>Please Login First</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>My Cart</h1>

      {cartItems.length === 0 ? (
        <h3>Cart is Empty</h3>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid gray",
                padding: 20,
                marginBottom: 20,
              }}
            >
              <h2>{item.product?.name}</h2>
              <p>{item.product?.description}</p>
              <h3>₹ {item.product?.price}</h3>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}

          <button onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
