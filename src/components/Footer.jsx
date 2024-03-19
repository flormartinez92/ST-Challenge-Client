import React from "react";
import Socials from "./Socials";

const Footer = () => {
  return (
    <footer className=" bg-slate-400 py-10">
      <div className="flex flex-col items-center justify-center">
        <Socials
          containerStyles="flex gap-x-6 mx-auto md:mx-0"
          iconStyles=" text-white text-[40px]"
        />
      </div>
    </footer>
  );
};

export default Footer;
