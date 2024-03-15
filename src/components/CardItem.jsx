"use client";

import { motion } from "framer-motion";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ModalProductInfo from "./ModalProductInfo";

const CardItem = () => {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState({ open: false, productId: null });

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleItemClick = async (productId) => {
    setModal({ open: !modal.open, productId });
  };

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {products?.map((product) => (
          <div
            key={product.id}
            onClick={() => handleItemClick(product.id)}
            className="m-2 border border-slate-500 rounded-md p-2 w-[270px] max-h-[420px] bg-white shadow-md hover:shadow-2xl transition duration-300 ease-in-out hover:cursor-pointer"
          >
            {modal.open && (
              <ModalProductInfo
                status={modal.open}
                closeModal={() => setModal({ open: false })}
                productId={modal.productId}
              />
            )}
            <div className="flex items-center justify-center py-3">
              <Image
                src={product.imageUrl}
                width={150}
                height={150}
                alt="wine"
                layout="fixed"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col items-center min-w-[190px] px-2 space-y-1">
              <h3 className="text-center text-lg">{product.name}</h3>
              <h4 className="text-center text-sm">
                Bodega: {product.brand.name}
              </h4>
              <p>{`$${Number(product.price)
                .toLocaleString()
                .replace(",", ".")}`}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardItem;
