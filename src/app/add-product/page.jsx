"use client";

import useInput from "@/hooks/useInput";
import { fetchBrands } from "@/utils/fetchBrands";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddProduct = () => {
  const [messageAlert, setMessageAlert] = useState("");
  const [messageOk, setMessageOk] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [brands, setBrands] = useState([]);
  // const [status, setStatus] = useState(false);
  const {
    onChange: onChangeProductname,
    value: valueProductname,
    onBlur: blurProductname,
    onFocus: focusProductname,
    errorMessage: messageProductname,
  } = useInput("productname");
  const {
    onChange: onChangeProductDescription,
    value: valueProductDescription,
    onBlur: blurProductDescription,
    onFocus: focusProductDescription,
    errorMessage: messageProductDescription,
  } = useInput("productdescription");
  const {
    onChange: onChangeProductImageUrl,
    value: valueProductImageUrl,
    onBlur: blurProductImageUrl,
    onFocus: focusProductImageUrl,
    errorMessage: messageProductImageUrl,
  } = useInput("productimageUrl");
  const {
    onChange: onChangeProductPrice,
    value: valueProductPrice,
    onBlur: blurProductPrice,
    onFocus: focusProductPrice,
    errorMessage: messageProductPrice,
  } = useInput("productprice");
  const router = useRouter();

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (
      valueProductname.trim() == "" ||
      valueProductDescription.trim() == "" ||
      valueProductImageUrl.trim() == "" ||
      valueProductPrice.trim() == ""
    ) {
      setMessageAlert("¡Completar todos los campos!");
      setTimeout(() => {
        setMessageAlert("");
      }, 1300);
    } else {
      if (
        messageProductname ||
        messageProductDescription ||
        messageProductImageUrl ||
        messageProductPrice
      ) {
        setMessageAlert("¡Verificar campos!");
        setTimeout(() => {
          setMessageAlert("");
        }, 1300);
      } else {
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products/product`,
            {
              name: valueProductname,
              description: valueProductDescription,
              imageUrl: valueProductImageUrl,
              price: valueProductPrice,
              brandId: selectedBrandId,
            }
          );
          setMessageAlert("");
          setMessageOk("¡Vino cargado!");
          router.push("/manage-products");
        } catch (error) {
          console.error(error);
          setMessageAlert("¡Error al cargar el producto!");
          setTimeout(() => {
            setMessageAlert("");
          }, 1300);
        }
      }
    }
  };

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

  const handleBrandChange = (e) => {
    const brandId = parseInt(e.target.value, 10);
    const brand = brands.find((brand) => brand.id == brandId);
    !brand ? setSelectedBrandId(null) : setSelectedBrandId(brand.id);
  };

  console.log("VER SELECTED BRAND ID", selectedBrandId);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-230px)]">
      <div className=" border-2 m-6 py-2 rounded-sm w-[280px]">
        <form onSubmit={onSubmitForm}>
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
                <label htmlFor="productname" className=" text-slate-900">
                  Nombre del vino:
                </label>
              </div>
              <div className="flex flex-col items-start justify-center my-3">
                <input
                  id="productname"
                  className=" text-xs w-full h-[30px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  type="text"
                  placeholder="Ingrese el nombre del vino"
                  name="productname"
                  value={valueProductname}
                  onFocus={focusProductname}
                  onBlur={blurProductname}
                  onChange={onChangeProductname}
                />
                <div className="h-[.5rem] p-1">
                  {messageProductname && (
                    <p className="text-red-500 text-[11px]">
                      {messageProductname}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-2">
              <div>
                <label htmlFor="productdescription" className=" text-slate-900">
                  Descripción:
                </label>
              </div>
              <div className="flex flex-col items-start justify-center my-3">
                <textarea
                  id="productdescription"
                  className=" text-xs w-full h-[140px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  type="text"
                  placeholder="Ingrese una descripción del vino"
                  name="productdescription"
                  value={valueProductDescription}
                  onFocus={focusProductDescription}
                  onBlur={blurProductDescription}
                  onChange={onChangeProductDescription}
                />
                <div className="h-[.5rem] p-1">
                  {messageProductDescription && (
                    <p className="text-red-500 text-[11px]">
                      {messageProductDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-2">
              <div>
                <label htmlFor="productimageUrl" className=" text-slate-900">
                  Imagen:
                </label>
              </div>
              <div className="flex flex-col items-start justify-center my-3">
                <input
                  id="productimageUrl"
                  className="text-xs w-full h-[30px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  type="url"
                  placeholder="Ingrese la URL de la imagen del vino"
                  name="productimageUrl"
                  value={valueProductImageUrl}
                  onFocus={focusProductImageUrl}
                  onBlur={blurProductImageUrl}
                  onChange={onChangeProductImageUrl}
                />

                {messageProductImageUrl && (
                  <div className="h-[.5rem] p-1">
                    <p className="text-red-500 text-[11px]">
                      {messageProductImageUrl}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="pt-2">
              <div>
                <label htmlFor="productprice" className=" text-slate-900">
                  Precio:
                </label>
              </div>
              <div className="flex flex-col items-start justify-center my-3">
                <input
                  id="productprice"
                  className="text-xs w-full h-[30px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  type="number"
                  placeholder="Ingrese el precio del vino"
                  name="productprice"
                  value={valueProductPrice}
                  onFocus={focusProductPrice}
                  onBlur={blurProductPrice}
                  onChange={onChangeProductPrice}
                />

                {messageProductPrice && (
                  <div className="h-[.5rem] p-1">
                    <p className="text-red-500 text-[11px]">
                      {messageProductPrice}
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
            <div className="my-4">
              <button
                className={`bg-slate-500 text-white p-1 rounded-md w-full ${
                  selectedBrandId === null
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={selectedBrandId === null}
              >
                Cargar
              </button>
            </div>
          </div>
        </form>
      </div>
      <Link href="/manage-products" className=" text-slate-900 underline pb-6">
        Volver
      </Link>
    </div>
  );
};

export default AddProduct;
