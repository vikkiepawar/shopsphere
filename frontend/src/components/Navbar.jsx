import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        background: "#222",
        alignItems: "center",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Home
      </Link>

      {!token ? (
        <>
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>

          <Link
            to="/register"
            style={{ color: "white", textDecoration: "none" }}
          >
            Register
          </Link>
        </>
      ) : (
        <>
          <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
            Cart
          </Link>

          <button
            onClick={logout}
            style={{
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
