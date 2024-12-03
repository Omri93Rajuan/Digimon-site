import "./Header.css";
import NavBar from "./nav-bar/NavBar";
import Logo from "./logo/Logo";
import TopNavBar from "./top-nav-bar/TopNavBar";

export default function Header() {
  return (
    <header className="header">
      <TopNavBar />
      <Logo />
      <NavBar />
    </header>
  );
}
