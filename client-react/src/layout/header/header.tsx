import NavBar from "./nav-bar/NavBar";
import Logo from "./logo/Logo";
import TopNavBar from "./top-nav-bar/TopNavBar";
import bg from "../../assets/bgHeader.png";

export default function Header() {
  return (
    <header className="bg-cover bg-center bg-no-repeat w-full text-center">
      <TopNavBar />
      <div className="mx-auto max-w-xl p-4">
        <Logo />
      </div>
      <NavBar />
    </header>
  );
}
