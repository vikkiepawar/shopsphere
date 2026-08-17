import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ProductCard({ product }) {
  const { addItem, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add products to cart");
      navigate("/login");
      return;
    }

    if (!product?._id) {
      toast.error("Product ID is missing");
      return;
    }

    try {
      await addItem(product._id, 1);

      toast.success(`${product.name} added to cart`);
    } catch (error) {
      console.error(
        "Add to cart error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to add product to cart"
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border">
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-blue-600">
            ₹{Number(product.price || 0).toLocaleString("en-IN")}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={18} />

            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
