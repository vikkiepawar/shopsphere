import { ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const stockStatus =
    product.stock === 0
      ? "Out of Stock"
      : product.stock <= 10
      ? "Only few left"
      : "In Stock";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden border border-gray-100"
    >
      {/* Image */}
      <div className="relative bg-gray-50 h-60">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-6 hover:scale-105 transition duration-300"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/500x500?text=No+Image";
            }}
          />
        </Link>

        {/* Wishlist */}
        <button
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          onClick={() => toast.info("Wishlist coming soon")}
        >
          <Heart size={18} />
        </button>

        {/* Stock badge */}
        <span
          className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${
            product.stock === 0
              ? "bg-red-100 text-red-600"
              : product.stock <= 10
              ? "bg-orange-100 text-orange-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {stockStatus}
        </span>
      </div>

      {/* Details */}
      <div className="p-5">

        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {product.category}
        </span>

        <Link to={`/product/${product._id}`}>
          <h2 className="font-bold text-lg mt-2 hover:text-blue-600 transition">
            {product.name}
          </h2>
        </Link>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* Price + Cart */}
        <div className="flex justify-between items-center mt-5">

          <div>
            <p className="text-xs text-gray-400">
              Price
            </p>

            <h2 className="text-2xl font-bold">
              ₹{product.price.toLocaleString("en-IN")}
            </h2>
          </div>

          <button
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            <ShoppingCart size={20} />
          </button>

        </div>

      </div>
    </motion.div>
  );
}

export default ProductCard;
