"use client";

import { setCredentials } from "@/state/features/authSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  RiAdminLine,
  RiLoginCircleLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import AdminMenu from "./AdminMenu";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await JSON.parse(localStorage.getItem("user"));
      if (!response) return;
      dispatch(
        setCredentials({
          username: response.username,
          isAdmin: response.isAdmin,
          token: response.token,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
        withCredentials: true,
        credentials: "include",
      });
      localStorage.removeItem("user");
      dispatch(setCredentials(null));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdminMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      {open && <AdminMenu onClose={handleAdminMenu} />}
      <div className=" h-[100px] flex items-center justify-center space-x-4 mr-4">
        {user === null && (
          <Link href="/login">
            <RiLoginCircleLine className=" text-white text-4xl" />
          </Link>
        )}
        {user !== null && user.isAdmin && (
          <>
            <button
              onClick={handleAdminMenu}
              className=" py-2 rounded-md w-[60px] flex justify-center items-center"
            >
              <RiAdminLine className=" text-white text-4xl" />
            </button>
            <button onClick={handleLogout}>
              <RiLogoutCircleLine className=" text-white text-4xl" />
            </button>
          </>
        )}
        {user !== null && !user.isAdmin && (
          <button
            onClick={handleLogout}
            className=" py-2 rounded-md w-[60px] flex justify-center items-center"
          >
            <RiLogoutCircleLine className=" text-white text-4xl" />
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
