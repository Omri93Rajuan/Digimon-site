import { Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import PaginationExample from "../Pages/Page";
import LiveWatch from "../Pages/LiveWatch";
import SocketPage from "../Pages/SocketPage";
export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>404 Who AM I?</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/page" element={<PaginationExample />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/livewatch" element={<LiveWatch />} />
        <Route path="/io" element={<SocketPage />} />

        <Route path="*" element={<h1>404 Who AM I?</h1>} />
      </Routes>
    </>
  );
}
