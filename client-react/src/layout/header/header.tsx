import React from "react";
import Link_nav_bar from "../../components/Link_nav_bar";

export default function Header() {
  return (
    <>
      <header>
        <h1>DIGIMON SITE</h1>
        <ul>
          <li>
            <Link_nav_bar to="/" InnerText="Home" />
          </li>
        </ul>
      </header>
    </>
  );
}
