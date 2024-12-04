import React from "react";
import Link_nav_bar from "../../../components/Link_nav_bar";
import digimon1 from "../../../assets/1.png";
import digimon2 from "../../../assets/2.png";
import digimon3 from "../../../assets/3.png";
import digimon4 from "../../../assets/4.png";
import digimon5 from "../../../assets/5.png";

export default function NavBar() {
  return (
    <nav className="bg-yellow-400">
      <ul className="flex justify-evenly items-center list-none gap-5 m-0 p-0">
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
          <Link_nav_bar
            to="/livewatch"
            innerText="צפייה ישירה"
            img={digimon4}
          />
        </li>
        <li>
          <Link_nav_bar to="/page" innerText="מאתגר" img={digimon5} />
        </li>
      </ul>
    </nav>
  );
}
