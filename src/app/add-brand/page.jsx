"use client";

import useInput from "@/hooks/useInput";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AddBrand = () => {
  const { user } = useSelector((state) => state.auth);
  const [messageAlert, setMessageAlert] = useState("");
  const [messageOk, setMessageOk] = useState("");
  const {
    onChange: onChangeBrandname,
    value: valueBrandname,
    onBlur: blurBrandname,
    onFocus: focusBrandname,
    errorMessage: messageBrandname,
  } = useInput("brandname");
  const {
    onChange: onChangeBrandLogo,
    value: valueBrandLogo,
    onBlur: blurBrandLogo,
    onFocus: focusBrandLogo,
    errorMessage: messageBrandLogo,
  } = useInput("brandlogo");
  const router = useRouter();

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (valueBrandname.trim() == "" || valueBrandLogo.trim() == "") {
      setMessageAlert("¡Completar todos los campos!");
      setTimeout(() => {
        setMessageAlert("");
      }, 1300);
    } else {
      if (messageBrandname || messageBrandLogo) {
        setMessageAlert("¡Verificar campos!");
        setTimeout(() => {
          setMessageAlert("");
        }, 1300);
      } else {
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/brands/brand`,
            {
              name: valueBrandname,
              logoUrl: valueBrandLogo,
            }
          );
          setMessageAlert("");
          setMessageOk("¡Bodega cargada!");
          router.push("/manage-brands");
        } catch (error) {
          console.error(error);
          setMessageAlert("¡Error al cargar la bodega!");
          setTimeout(() => {
            setMessageAlert("");
          }, 1300);
        }
      }
    }
  };

  if (!user || !user.isAdmin) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-230px)]">
      <div className=" border-2 m-8 p-2 rounded-sm w-[340px] md:w-[640px]">
        <form onSubmit={onSubmitForm}>
          <div className="m-4">
            <div>
              <div>
                <label htmlFor="brandname" className=" text-slate-900">
                  Nombre de la Bodega:
                </label>
              </div>
              <div className="flex flex-col items-start justify-center my-3">
                <input
                  id="brandname"
                  className=" text-xs w-full h-[30px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  type="text"
                  placeholder="Ingrese el nombre de la bodega"
                  name="brandname"
                  value={valueBrandname}
                  onFocus={focusBrandname}
                  onBlur={blurBrandname}
                  onChange={onChangeBrandname}
                />
                <div className="h-[.5rem] p-1">
                  {messageBrandname && (
                    <p className="text-red-500 text-[11px]">
                      {messageBrandname}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-2">
              <div>
                <label htmlFor="brandlogo" className=" text-slate-900">
                  Logo:
                </label>
              </div>
              <div className="flex flex-col items-start justify-center my-3">
                <input
                  id="brandlogo"
                  className="text-xs w-full h-[30px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  type="url"
                  placeholder="Ingrese la URL del logo de la bodega"
                  name="brandlogo"
                  value={valueBrandLogo}
                  onFocus={focusBrandLogo}
                  onBlur={blurBrandLogo}
                  onChange={onChangeBrandLogo}
                />

                {messageBrandLogo && (
                  <div className="h-[.5rem] p-1">
                    <p className="text-red-500 text-[11px]">
                      {messageBrandLogo}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className=" flex flex-col items-center justify-center pt-6">
              {messageAlert ? (
                <p className="text-[#ff0000] text-sm leading-3">
                  {messageAlert}
                </p>
              ) : (
                <p className="text-[#389817] text-sm leading-3">{messageOk}</p>
              )}
            </div>
            <div className="my-6">
              <button className="bg-slate-500 text-white p-1 rounded-md w-full">
                Cargar
              </button>
            </div>
          </div>
        </form>
      </div>
      <Link href="/manage-brands" className=" text-slate-900 underline">
        Volver
      </Link>
    </div>
  );
};

export default AddBrand;
