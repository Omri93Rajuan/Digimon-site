import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  innerText: string;
  img: string;
}

export default function Link_nav_bar({ to, innerText, img = "" }: Props) {
  const navItemContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const linkStyle = {
    textDecoration: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#F2A7CA",
  };

  const imgStyle = {
    width: "70px",
  };

  return (
    <div
      className="nav-item-container rubik-doodle-regular"
      style={navItemContainerStyle}
    >
      <img src={img} alt={"this is a " + img + " picture"} style={imgStyle} />
      <NavLink to={to} style={linkStyle}>
        {innerText}
      </NavLink>
    </div>
  );
}
