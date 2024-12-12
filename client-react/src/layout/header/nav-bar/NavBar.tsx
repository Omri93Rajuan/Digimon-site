import React from "react";
import Link_nav_bar from "../../../components/Link_nav_bar";
import digimon1 from "../../../assets/1.png";
import digimon2 from "../../../assets/2.png";
import digimon3 from "../../../assets/3.png";
import digimon4 from "../../../assets/4.png";
import digimon5 from "../../../assets/5.png";
import Logo from "../logo/Logo";

export default function NavBar() {
  return (
    <nav className="bg-customPink">
      <ul className="flex justify-evenly items-center list-none gap-5 m-0 p-0">
        <li>
          <Link_nav_bar to="/" innerText="Home" img={digimon1} />
        </li>
        <li>
          <Link_nav_bar to="/io" innerText="About" img={digimon2} />
        </li>
        <div className="flex justify-center py-4 ml-10">
          <Logo />
        </div>

        <li>
          <Link_nav_bar to="/" innerText="Store" img={digimon3} />
        </li>
        <li>
          <Link_nav_bar to="/page" innerText="Cart" img={digimon5} />
        </li>
      </ul>
    </nav>
  );
}
