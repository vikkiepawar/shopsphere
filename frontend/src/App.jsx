import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
       <Route element={<MainLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route element={<ProtectedRoute />}>
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/profile" element={<Profile />} />
  </Route>
</Route>

      </Routes>

      <Toaster
        position="top-right"
        richColors
      />
    </>
  );
}

export default App;