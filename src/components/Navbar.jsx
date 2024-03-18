"use client";

import { setCredentials } from "@/state/features/authSlice";
import { fetchUser } from "@/utils/fetchUser";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  RiAdminLine,
  RiLoginCircleLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import AdminMenu from "./AdminMenu";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetchUser();
      if (!response) return;
      dispatch(
        setCredentials({
          username: response.user.username,
          isAdmin: response.user.isAdmin,
          token: response.token,
        })
      );
    } catch (error) {
      console.error("Este es el error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    dispatch(setCredentials(null));
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
