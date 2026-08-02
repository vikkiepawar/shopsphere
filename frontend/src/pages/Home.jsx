import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isCancelled = false;

    const loadProducts = async () => {
      try {
        const res = await API.get("/products");
        if (!isCancelled) {
          setProducts(res.data.products);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();

    return () => {
      isCancelled = true;
    };
  }, []);

  const addToCart = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/cart",
        {
          product: id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added To Cart");
    } catch (err) {
      alert(err.response?.data?.message || "Login First");
    }
  };

  return (
  <div className="container">
    <h1 style={{ marginTop: 20 }}>ShopSphere</h1>

    <div className="products">
      {products.map((p) => (
        <div className="card" key={p._id}>
          <img src={p.image} alt={p.name} />

          <h2>{p.name}</h2>

          <p>{p.description}</p>

          <h3>₹ {p.price}</h3>

          <button onClick={() => addToCart(p._id)}>
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  </div>
);

}

export default Home;