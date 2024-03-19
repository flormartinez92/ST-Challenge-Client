"use client";

import useInput from "@/hooks/useInput";
import { fetchBrandId } from "@/utils/fetchBrandId";
import { fetchBrands } from "@/utils/fetchBrands";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UpdateBrand = () => {
  const { user } = useSelector((state) => state.auth);
  const [brands, setBrands] = useState([]);
  let [selectedBrand, setSelectedBrand] = useState(null);
  const [messageAlert, setMessageAlert] = useState("");
  const [messageOk, setMessageOk] = useState("");
  const [status, setStatus] = useState(false);
  const [editFields, setEditFields] = useState({
    name: false,
    logoUrl: false,
  });
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
      if (selectedBrand) {
        const brandInfo = await fetchBrandId(selectedBrand.id);
        setSelectedBrand(brandInfo);
      }
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

  const toggleEditField = (field) => {
    setEditFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (!user || !user.isAdmin) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-230px)]">
      {selectedBrand && (
        <div className="border-2 rounded-sm w-[340px] p-3 mt-6 md:w-[640px]">
          <div className="flex flex-row items-center justify-center">
            <div className="w-2/4 space-y-2 text-center">
              <h3 className="text-sm underline capitalize">
                {selectedBrand.name}
              </h3>
            </div>
            <div className="w-2/4 flex items-center justify-center">
              <Image
                src={selectedBrand.logoUrl}
                width={170}
                height={170}
                alt="winery"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      )}
      <div className=" border-2 m-8 p-2 rounded-sm w-[340px] md:w-[640px]">
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
            <div className="pt-2">
              <h2
                htmlFor="editname"
                className=" cursor-pointer text-[#bb2700] py-1"
                onClick={() => toggleEditField("name")}
              >
                + Editar nombre de la bodega
              </h2>
              {editFields.name && (
                <>
                  <div>
                    <label htmlFor="brandname" className=" text-slate-900">
                      Nuevo nombre:
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
                </>
              )}
            </div>
            <div className="pt-2">
              <h2
                htmlFor="editlogoUrl"
                className=" cursor-pointer text-[#bb2700] py-1"
                onClick={() => toggleEditField("logoUrl")}
              >
                + Editar logo de la bodega
              </h2>
              {editFields.logoUrl && (
                <>
                  <div>
                    <label htmlFor="brandlogo" className=" text-slate-900">
                      Nuevo logo:
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
                </>
              )}
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
