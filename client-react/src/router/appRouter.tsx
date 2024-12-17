import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PaginationExample from "../pages/Page";
import LiveWatch from "../pages/LiveWatch";
import SocketPage from "../pages/SocketPage";
import StorePage from "../store/StorePage";
import CartPage from "../store/CartPage";
import { IProduct } from "../types/product.interface";
import { useState } from "react";
export default function AppRouter() {
  const [cart, setCart] = useState<IProduct[]>([]);

  return (
    <>
      <Routes>
        <Route path="/" element={<h1>404 Who AM I?</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/page" element={<PaginationExample />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/livewatch" element={<LiveWatch />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<h1>404 Who AM I?</h1>} />
      </Routes>
    </>
  );
}
