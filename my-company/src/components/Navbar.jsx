import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav style={{ backgroundColor: "#f8f9fa", padding: "1rem" }}>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "1rem",
            padding: 0,
            margin: 0,
          }}
        >
          <li
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              transition: "background-color 0.3s",
            }}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              transition: "background-color 0.3s",
            }}
          >
            <Link to="/about">About</Link>
          </li>
          <li
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              transition: "background-color 0.3s",
            }}
          >
            <Link to="/services">Services</Link>
          </li>
          <li
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              transition: "background-color 0.3s",
            }}
          >
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
