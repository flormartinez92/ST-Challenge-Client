import CardBrand from "@/components/CardBrand";
import Link from "next/link";
import React from "react";

const ManageBrands = () => {
  return (
    <section className="min-h-[calc(100vh-230px)]">
      <div>
        <div className="flex flex-col items-center justify-center my-8">
          <h2 className="text-xl underline text-slate-800">
            Listado de Bodegas:
          </h2>
          <CardBrand />
          <div className="flex flex-col justify-center items-center space-y-4 my-6">
            <Link href="/add-brand">
              <button className="bg-slate-500 text-white p-3 rounded-md w-full">
                Agregar Bodega
              </button>
            </Link>
            <Link href="/update-brand">
              <button className="bg-slate-500 text-white p-3 rounded-md w-full">
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
