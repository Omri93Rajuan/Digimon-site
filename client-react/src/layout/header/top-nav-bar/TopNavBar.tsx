import React from "react";
import { Link } from "react-router-dom";

export default function TopNavBar() {
  const topNav: React.CSSProperties = {
    listStyle: "none",
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  };

  return (
    <>
      <ul className="nav-menu rubik-doodle-shadow-regular" style={topNav}>
        <li>
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div>כניסה</div>
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div>הרשמה</div>
          </Link>
        </li>
      </ul>
    </>
  );
}
