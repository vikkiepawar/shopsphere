import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          ShopSphere
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
          >
            <User size={18} />
            Login
          </Link>

          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-blue-600"
          >
            <ShoppingCart size={23} />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        <Link
          to="/cart"
          className="md:hidden relative"
        >
          <ShoppingCart size={23} />

          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;

