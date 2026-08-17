import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">

        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl bg-gray-100 p-8"
        />

        <div>
          <h1 className="text-5xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-4">
            {product.category}
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-6">
            ₹{product.price}
          </h2>

          <p className="mt-8 text-gray-600">
            {product.description}
          </p>

          <p className="mt-8 font-semibold">
            Stock: {product.stock}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="mt-10 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700"
          
          >
            Add To Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;