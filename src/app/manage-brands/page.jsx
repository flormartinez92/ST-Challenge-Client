"use client";

import CardBrand from "@/components/CardBrand";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ManageBrands = () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push("/");
      return null;
    }
  }, []);

  return (
    <section className="min-h-[calc(100vh-230px)] max-w-[1200px] m-auto">
      <div>
        <div className="flex flex-col items-center justify-center my-8">
          <h2 className="text-xl underline text-slate-800">
            Listado de Bodegas:
          </h2>
          <CardBrand />
          <div className="flex flex-col justify-center items-center space-y-4 my-6 md:flex-row md:space-y-0 md:space-x-6">
            <Link href="/add-brand">
              <button className="bg-slate-500 text-white p-3 rounded-md w-[160px]">
                Agregar Bodega
              </button>
            </Link>
            <Link href="/update-brand">
              <button className="bg-slate-500 text-white p-3 rounded-md w-[160px]">
                Editar Bodega
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageBrands;
