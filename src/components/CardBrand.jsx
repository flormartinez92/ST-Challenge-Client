"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchBrands } from "@/utils/fetchBrands";
import { motion } from "framer-motion";

const CardBrand = () => {
  const [brands, setBrands] = useState([]);

  const fetchData = async () => {
    try {
      const brands = await fetchBrands();
      setBrands(brands);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center select-none">
        {brands?.map((brand) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.1,
              delay: 0.2,
              ease: [0, 0.3, 0.2, 0.7],
            }}
            key={brand.id}
            className="border-2 rounded-sm border-slate-500 m-6 p-3 bg-white flex flex-col items-center justify-center"
          >
            <div className="flex items-center justify-center py-3 m-2 w-[150px] h-[150px]">
              {
                <Image
                  src={brand.logoUrl}
                  width={150}
                  height={150}
                  alt="winery logo"
                  objectFit="contain"
                />
              }
            </div>
            <h3 className="capitalize">{brand.name}</h3>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default CardBrand;
