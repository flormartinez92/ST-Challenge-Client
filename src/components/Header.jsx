import React from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className=" bg-slate-400 py-3 px-6 drop-shadow-md sticky top-0 z-10">
      <div className="flex flex-row items-center justify-between max-w-[1200px] m-auto">
        <Logo />
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
