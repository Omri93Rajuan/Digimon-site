import React from "react";
import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import "./layout.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="layout-container">
        <Header />
        <Main children={children} />
        <Footer />
      </div>
    </>
  );
}
