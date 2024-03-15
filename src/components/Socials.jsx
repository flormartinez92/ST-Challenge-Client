"use client";

import Link from "next/link";
import React from "react";
import { RiLinkedinFill, RiGithubFill } from "react-icons/ri";

const icons = [
  {
    path: "https://www.linkedin.com/in/florencia-martinez92/",
    name: <RiLinkedinFill />,
  },
  { path: "https://github.com/flormartinez92", name: <RiGithubFill /> },
];

const Socials = ({ containerStyles, iconStyles }) => {
  return (
    <div className={`${containerStyles}`}>
      {icons.map((icon, i) => {
        return (
          <Link key={i} href={icon.path} target="_blank">
            <div className={`${iconStyles} text-2xl`}>{icon.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
