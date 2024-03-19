import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import Link from "next/link";
import { motion } from "framer-motion";

const AdminMenu = ({ onClose }) => {
  return (
    <>
      <div className=" bg-slate-700/50 min-h-screen w-full fixed top-0 left-0 right-0"></div>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5 }}
        className=" bg-slate-800 min-h-screen w-[200px] fixed top-0 right-0 md:w-[400px]"
      >
        <div className="flex items-end justify-end mb-14">
          <button
            onClick={onClose}
            className="pt-3  mr-4 text-4xl text-white/90"
          >
            <RxCrossCircled />
          </button>
        </div>
        <Link onClick={onClose} href="/manage-brands">
          <div className="flex justify-center items-center space-x-2 text-white/90 text-2xl hover:bg-slate-600 cursor-pointer py-3 mb-2 ">
            <p>BODEGAS</p>
            <MdOutlineEdit />
          </div>
        </Link>
        <Link onClick={onClose} href="/manage-products">
          <div className="flex justify-center items-center space-x-2 text-white/90 text-2xl hover:bg-slate-600 cursor-pointer py-3 mb-2 ">
            <p>VINOS</p>
            <MdOutlineEdit />
          </div>
        </Link>
      </motion.div>
    </>
  );
};

export default AdminMenu;
