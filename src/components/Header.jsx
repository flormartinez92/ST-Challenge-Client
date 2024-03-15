import React from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className=" bg-slate-400 py-4 flex justify-between items-center">
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
