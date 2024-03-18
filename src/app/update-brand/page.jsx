"use client";

import useInput from "@/hooks/useInput";
import { fetchBrands } from "@/utils/fetchBrands";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UpdateBrand = () => {
  const { user } = useSelector((state) => state.auth);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [messageAlert, setMessageAlert] = useState("");
  const [messageOk, setMessageOk] = useState("");
  const [status, setStatus] = useState(false);
  let {
    onChange: onChangeBrandname,
    value: valueBrandname,
    onBlur: blurBrandname,
    onFocus: focusBrandname,
  } = useInput("brandname");
  let {
    onChange: onChangeBrandLogo,
    value: valueBrandLogo,
    onBlur: blurBrandLogo,
    onFocus: focusBrandLogo,
  } = useInput("brandlogo");
  const router = useRouter();

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
  }, [status]);

  const handleBrandChange = (e) => {
    const selectedBrandId = parseInt(e.target.value, 10);
    const brand = brands.find((brand) => brand.id == selectedBrandId);
    !brand ? setSelectedBrand(null) : setSelectedBrand(brand);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const requestData = {
      name:
        valueBrandname.trim() !== selectedBrand.name &&
        valueBrandname.trim() !== ""
          ? valueBrandname
          : selectedBrand.name,
      logoUrl:
        valueBrandLogo.trim() !== selectedBrand.logoUrl &&
        valueBrandLogo.trim() !== ""
          ? valueBrandLogo
          : selectedBrand.logoUrl,
    };

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/brands/${selectedBrand.id}`,
        requestData
      );
      setMessageOk("¡Bodega actualizada!");
      setTimeout(() => {
        setMessageOk("");
      }, 1000);
      setStatus(!status);
    } catch (error) {
      console.error(error);
      setMessageAlert("¡Error al actualizar la bodega!");
      setTimeout(() => {
        setMessageAlert("");
      }, 1000);
    }
  };

  useEffect(() => {
    if (selectedBrand) {
      valueBrandname = selectedBrand.name;
      valueBrandLogo = selectedBrand.logoUrl;
    }
  }, [selectedBrand]);

  if (!user || !user.isAdmin) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-230px)]">
      <div className=" border-2 m-8 p-2 rounded-sm w-[280px]">
        <form onSubmit={handleSubmitForm}>
          <div className="m-4">
            <div>
              <div>
                <label htmlFor="brandSelect" className="text-slate-900">
                  Seleccionar Bodega:
                </label>
              </div>
              <div className="flex flex-col items-start justify-center my-3">
                <select
                  name="brandSelect"
                  id="brandSelect"
                  className="peer text-xs w-full h-[35px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent capitalize"
                  onChange={handleBrandChange}
                >
                  <option value={brands.name}>Seleccionar bodega...</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="brandname" className=" text-slate-900">
                  Nombre de la Bodega:
                </label>
              </div>
              <div className="flex flex-col items-start justify-center my-3">
                <input
                  id="brandname"
                  className=" text-xs w-full h-[35px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  type="text"
                  placeholder="Ingrese el nombre de la bodega"
                  name="brandname"
                  value={valueBrandname}
                  onFocus={focusBrandname}
                  onBlur={blurBrandname}
                  onChange={onChangeBrandname}
                />
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
                  className="text-xs w-full h-[35px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  type="text"
                  placeholder="Ingrese la URL del logo de la bodega"
                  name="brandlogo"
                  value={valueBrandLogo}
                  onFocus={focusBrandLogo}
                  onBlur={blurBrandLogo}
                  onChange={onChangeBrandLogo}
                />
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
              <button
                className={`bg-slate-500 text-white p-1 rounded-md w-full ${
                  selectedBrand === null ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={selectedBrand === null}
              >
                Editar
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

export default UpdateBrand;
