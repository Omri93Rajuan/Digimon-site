import "./Header.css";
import NavBar from "./nav-bar/NavBar";
import Logo from "./logo/Logo";

export default function Header() {
  return (
    <header className="header">
      <Logo />
      <NavBar />
    </header>
  );
}
