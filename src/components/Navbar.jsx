"use client";

import { setCredentials } from "@/state/features/authSlice";
import { fetchUser } from "@/utils/fetchUser";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  RiAdminLine,
  RiLoginCircleLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
// import AdminMenu from "./AdminMenu";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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

  return (
    <>
      {/* <AdminMenu /> */}
      <div className="w-[220px] h-[100px] flex items-center justify-center space-x-6">
        {user === null && (
          <Link href="/login">
            <RiLoginCircleLine className=" text-white text-4xl" />
          </Link>
        )}
        {user !== null && user.isAdmin && (
          <>
            {/* <Link href="/admin-panel"> */}
            <button className=" bg-slate-700 py-2 rounded-md w-[60px] flex justify-center items-center">
              {/* <p className="text-white">Panel</p> */}
              <RiAdminLine className=" text-white text-4xl" />
            </button>

            {/* </Link> */}
            <button onClick={handleLogout}>
              <RiLogoutCircleLine className=" text-white text-4xl" />
            </button>
          </>
        )}
        {user !== null && !user.isAdmin && (
          <button onClick={handleLogout}>
            <RiLogoutCircleLine className=" text-white text-4xl" />
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
