import React from "react";
import { Link } from "react-router-dom";

export default function TopNavBar() {
  return (
    <ul className="flex justify-end gap-2 list-none text-right">
      <li>
        <Link to="/login" className="no-underline text-inherit">
          <div>כניסה</div>
        </Link>
      </li>
      <li>
        <Link to="/register" className="no-underline text-inherit">
          <div>הרשמה</div>
        </Link>
      </li>
    </ul>
  );
}
