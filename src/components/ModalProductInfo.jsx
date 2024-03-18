"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ModalProductInfo = ({ status, closeModal, product }) => {
  const dialofRef = useRef(null);
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  useEffect(() => {
    if (status) {
      dialofRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialofRef.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [status]);

  return (
    <>
      {status && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-10 "
        >
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-md border border-gray-800 p-4 w-[350px] h-[580px] relative md:w-[600px] md:h-[500px] flex flex-col items-center justify-around space-y-3 select-none"
          >
            <h2 className="underline text-lg">{product?.name}</h2>
            <Image
              src={product?.imageUrl}
              width={150}
              height={150}
              alt="wine"
              layout="fixed"
              objectFit="cover"
            />
            <p className=" text-sm text-center">{product?.description}</p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ModalProductInfo;
