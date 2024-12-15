import React from "react";
import logo from "../../../assets/logo.png";

export default function Logo() {
  return (
    <img
      src={logo}
      alt="Logo"
      className="w-36 h-auto transition-transform duration-300 hover:scale-110 ml-6"
    />
  );
}
