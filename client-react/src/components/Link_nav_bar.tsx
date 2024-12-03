import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  innerText: string;
  img: string;
}

export default function Link_nav_bar({ to, innerText, img }: Props) {
  const navItemContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const linkStyle = {
    textDecoration: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "black",
  };

  const imgStyle = {
    width: "70px",
  };

  return (
    <div className="nav-item-container" style={navItemContainerStyle}>
      <NavLink to={to} style={linkStyle}>
        {innerText}
      </NavLink>
      <img src={img} alt={"this is a " + img + " picture"} style={imgStyle} />
    </div>
  );
}
