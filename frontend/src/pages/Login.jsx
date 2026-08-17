import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await API.post(
        "/auth/login",
        form
      );

      console.log("Login response:", response.data);

      const success = login(response.data);

      if (!success) {
        setError("Invalid login response from server.");
        return;
      }

      navigate("/");
    } catch (err) {
      console.error(
        "Login error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 mb-8">
          Login to your ShopSphere account
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
