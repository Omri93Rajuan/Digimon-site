import { Route, Routes } from "react-router-dom";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>404 Who AM I?</h1>} />
        <Route path="*" element={<h1>404 Who AM I?</h1>} />
      </Routes>
    </>
  );
}
