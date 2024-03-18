"use client";

import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ModalProductInfo from "./ModalProductInfo";
import { fetchProducts } from "@/utils/fetchProducts";

const CardItem = ({ allowModal }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchData = async () => {
    try {
      const products = await fetchProducts();
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemClick = async (productId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`
      );
      setSelectedProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center select-none">
        {products?.map((product) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.1,
              delay: 0.2,
              ease: [0, 0.3, 0.2, 0.7],
            }}
            key={product.id}
            onClick={() => handleItemClick(product.id)}
            className={`m-2 border border-slate-500 rounded-md p-2 w-[270px] max-h-[420px] bg-white shadow-md ${
              allowModal
                ? "hover:shadow-2xl transition duration-300 ease-in-out hover:cursor-pointer"
                : ""
            } `}
          >
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
              <h3 className="text-center text-lg capitalize">{product.name}</h3>
              <h4 className="text-center text-sm">
                Bodega: {product.brand.name}
              </h4>
              <p>{`$${Number(product.price)
                .toLocaleString()
                .replace(",", ".")}`}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {selectedProduct && allowModal == true && (
          <ModalProductInfo
            status={true}
            closeModal={closeModal}
            product={selectedProduct}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CardItem;
