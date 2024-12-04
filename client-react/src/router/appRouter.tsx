import { Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
// import RegisterPage from "../Pages/RegisterPage";
import PaginationExample from "../Pages/Page";
import SearchComponent from "../Pages/Search";
import LazyImage from "../Pages/Search";
import src from "../assets/Digimon-guilmon.jpg";
export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>404 Who AM I?</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/page" element={<PaginationExample />} />
        <Route path="/search" element={<LazyImage src={src} alt="digimon" />} />

        <Route path="*" element={<h1>404 Who AM I?</h1>} />
      </Routes>
    </>
  );
}
