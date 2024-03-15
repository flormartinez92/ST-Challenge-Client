"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ModalProductInfo = ({ status, closeModal, productId }) => {
  const [product, setProduct] = useState([]);
  const dialofRef = useRef(null);

  const fetchProductById = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, [status, productId]);

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

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {status && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-10 ">
          <div
            onClick={(e) => handleModalContentClick(e)}
            className="bg-white rounded-md border border-gray-800 p-4 w-[350px] h-[580px] relative md:w-[600px] md:h-[500px] flex flex-col items-center justify-around space-y-3"
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
          </div>
        </div>
      )}
    </>
  );
};

export default ModalProductInfo;
