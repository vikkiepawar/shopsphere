import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalItems,
  } = useCart();

  const {
    user,
    logout,
    isAuthenticated,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          ShopSphere
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">

          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/orders"
                className="text-gray-700 hover:text-blue-600"
              >
                Orders
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
              >
                <User size={18} />

                <span>
                  {user?.name || "Profile"}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-gray-700 hover:text-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
            >
              <User size={18} />
              Login
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-blue-600"
          >
            <ShoppingCart size={23} />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

        </div>

        {/* Mobile Cart */}
        <Link
          to="/cart"
          className="md:hidden relative"
        >
          <ShoppingCart size={23} />

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;