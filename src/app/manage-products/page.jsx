"use client";

import CardItem from "@/components/CardItem";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const ManageProducts = () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  if (!user || !user.isAdmin) {
    router.push("/");
    return null;
  }

  return (
    <section className="min-h-[calc(100vh-230px)]">
      <div>
        <div className="flex flex-col items-center justify-center my-8">
          <h2 className="text-xl underline text-slate-800 py-6">
            Listado de Vinos:
          </h2>
          <CardItem allowModal={false} />
          <div className="flex flex-col justify-center items-center space-y-4 my-6">
            <Link href="/add-product">
              <button className="bg-slate-500 text-white p-3 rounded-md w-full">
                Agregar Vino
              </button>
            </Link>
            <Link href="/update-product">
              <button className="bg-slate-500 text-white p-3 rounded-md w-full">
                Editar Vino
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageProducts;
