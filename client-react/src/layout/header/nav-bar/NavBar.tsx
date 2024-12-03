import React from "react";
import Link_nav_bar from "../../../components/Link_nav_bar";
import digimon1 from "../../../assets/1.png";
import digimon2 from "../../../assets/2.png";
import digimon3 from "../../../assets/3.png";
import digimon4 from "../../../assets/4.png";

export default function NavBar() {
  const navBar = {
    backgroundColor: "#EBC55A",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    listStyle: "none",
    gap: "20px",
    margin: 0,
    padding: 0,
  };
  return (
    <nav className="nav-bar">
      <ul className="nav-menu" style={navBar}>
        <li>
          <Link_nav_bar to="/" innerText="בית" img={digimon1} />
        </li>
        <li>
          <Link_nav_bar to="/" innerText="אנימה" img={digimon2} />
        </li>
        <li>
          <Link_nav_bar to="/" innerText="דיג'ימונים" img={digimon3} />
        </li>
        <li>
          <Link_nav_bar to="/" innerText="חנות" img={digimon4} />
        </li>
      </ul>
    </nav>
  );
}
