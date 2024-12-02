import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <p>Created by O.R &copy; {new Date().getFullYear()}</p>
      <button>
        <Link to={"/users"}>Go Home KId! </Link>
      </button>
    </footer>
  );
}
