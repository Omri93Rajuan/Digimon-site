import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  innerText: string;
}

export default function Link_nav_bar({ to, innerText }: Props) {
  return (
    <div className="text-xl font-medium hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 hover:translate-x-2">
      <NavLink to={to}>{innerText}</NavLink>
    </div>
  );
}
