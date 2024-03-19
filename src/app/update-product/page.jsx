"use client";

import useInput from "@/hooks/useInput";
import { fetchBrands } from "@/utils/fetchBrands";
import { fetchProductId } from "@/utils/fetchProductId";
import { fetchProducts } from "@/utils/fetchProducts";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UpdateProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  let [selectedProduct, setSelectedProduct] = useState(null);
  const [messageAlert, setMessageAlert] = useState("");
  const [messageOk, setMessageOk] = useState("");
  const [status, setStatus] = useState(false);
  const [editFields, setEditFields] = useState({
    name: false,
    description: false,
    imageUrl: false,
    price: false,
  });
  let {
    onChange: onChangeProductname,
    value: valueProductname,
    onBlur: blurProductname,
    onFocus: focusProductname,
  } = useInput("productname");
  let {
    onChange: onChangeProductDescription,
    value: valueProductDescription,
    onBlur: blurProductDescription,
    onFocus: focusProductDescription,
  } = useInput("productdescription");
  let {
    onChange: onChangeProductImageUrl,
    value: valueProductImageUrl,
    onBlur: blurProductImageUrl,
    onFocus: focusProductImageUrl,
  } = useInput("productimageUrl");
  let {
    onChange: onChangeProductPrice,
    value: valueProductPrice,
    onBlur: blurProductPrice,
    onFocus: focusProductPrice,
  } = useInput("productprice");
  const router = useRouter();

  const fetchData = async () => {
    try {
      const brands = await fetchBrands();
      setBrands(brands);
      const products = await fetchProducts();
      setProducts(products);
      if (selectedProduct) {
        const productInfo = await fetchProductId(selectedProduct.id);
        setSelectedProduct(productInfo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push("/");
      return null;
    }
    fetchData();
  }, [status]);

  const handleBrandChange = (e) => {
    const selectedBrandId = parseInt(e.target.value, 10);
    const brand = brands.find((brand) => brand.id == selectedBrandId);
    !brand ? setSelectedBrand(null) : setSelectedBrand(brand);
  };

  const handleProductChange = (e) => {
    const selectedProductId = parseInt(e.target.value, 10);
    const product = products.find((product) => product.id == selectedProductId);
    !product ? setSelectedProduct(null) : setSelectedProduct(product);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const requestData = {
      name:
        valueProductname.trim() !== selectedProduct.name &&
        valueProductname.trim() !== ""
          ? valueProductname
          : selectedProduct.name,
      description:
        valueProductDescription.trim() !== selectedProduct.description &&
        valueProductDescription.trim() !== ""
          ? valueProductDescription
          : selectedProduct.description,
      imageUrl:
        valueProductImageUrl.trim() !== selectedProduct.imageUrl &&
        valueProductImageUrl.trim() !== ""
          ? valueProductImageUrl
          : selectedProduct.imageUrl,
      price:
        valueProductPrice !== selectedProduct.price && valueProductPrice !== ""
          ? valueProductPrice
          : selectedProduct.price,
      brandId: selectedBrand.id,
    };

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${selectedProduct.id}`,
        requestData
      );
      setMessageOk("¡Producto actualizado!");
      setTimeout(() => {
        setMessageOk("");
      }, 1000);
      setStatus(!status);
    } catch (error) {
      console.error(error);
      setMessageAlert("¡Error al actualizar el producto!");
      setTimeout(() => {
        setMessageAlert("");
      }, 1000);
    }
  };

  const handleDeleteProduct = async (e) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${selectedProduct.id}`
      );
      setMessageOk("¡Producto eliminado!");
      setTimeout(() => {
        setMessageOk("");
      }, 1000);
      setSelectedProduct(null);
      setStatus(!status);
    } catch (error) {
      console.error(error);
      setMessageAlert("¡Error al eliminar el producto!");
      setTimeout(() => {
        setMessageAlert("");
      }, 1000);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      valueProductname = selectedProduct.name;
      valueProductDescription = selectedProduct.description;
      valueProductImageUrl = selectedProduct.imageUrl;
      valueProductPrice = selectedProduct.price;
    }
  }, [selectedProduct]);

  const toggleEditField = (field) => {
    setEditFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-230px)]">
      {selectedProduct && (
        <div className="border-2 rounded-sm w-[340px] p-3 mt-6 md:w-[640px]">
          <div className="flex flex-row">
            <div className="w-3/4 space-y-2">
              <h3 className="text-sm underline capitalize">
                {selectedProduct.name}
              </h3>
              <h2 className="text-xs capitalize">
                Bodega: {selectedProduct.brand?.name}
              </h2>
              <p className="text-xs text-left">{selectedProduct.description}</p>
              <p className="text-xs">{`$${Number(selectedProduct.price)
                .toLocaleString()
                .replace(",", ".")}`}</p>
            </div>
            <div className="w-1/4 flex items-center justify-center">
              <Image
                src={selectedProduct.imageUrl}
                width={90}
                height={90}
                alt="wine"
                layout="fixed"
                objectFit="cover"
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
                <label htmlFor="productSelect" className="text-slate-900">
                  Seleccionar Vino:
                </label>
              </div>
              <div className="flex flex-col items-start justify-center my-3">
                <select
                  name="productSelect"
                  id="productSelect"
                  className="peer text-xs w-full h-[35px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent capitalize"
                  onChange={handleProductChange}
                >
                  <option value={products.name}>Seleccionar vino...</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
                + Editar nombre del vino
              </h2>
              {editFields.name && (
                <>
                  <div>
                    <label htmlFor="productname" className=" text-slate-900">
                      Nuevo nombre:
                    </label>
                  </div>
                  <div className="flex flex-col items-start justify-center my-3">
                    <input
                      id="productname"
                      className=" text-xs w-full h-[35px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      type="text"
                      placeholder="Ingrese el nombre del vino"
                      name="productname"
                      value={valueProductname}
                      onFocus={focusProductname}
                      onBlur={blurProductname}
                      onChange={onChangeProductname}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="pt-2">
              <h2
                htmlFor="editdescription"
                className=" cursor-pointer text-[#bb2700] py-1"
                onClick={() => toggleEditField("description")}
              >
                + Editar descripción del vino
              </h2>
              {editFields.description && (
                <>
                  <div>
                    <label
                      htmlFor="productdescription"
                      className=" text-slate-900"
                    >
                      Nueva descripción:
                    </label>
                  </div>
                  <div className="flex flex-col items-start justify-center my-3">
                    <textarea
                      id="productdescription"
                      className=" text-xs w-full h-[140px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      type="text"
                      placeholder="Ingrese una descripción"
                      name="productdescription"
                      value={valueProductDescription}
                      onFocus={focusProductDescription}
                      onBlur={blurProductDescription}
                      onChange={onChangeProductDescription}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="pt-2">
              <h2
                htmlFor="editimageUrl"
                className=" cursor-pointer text-[#bb2700] py-1"
                onClick={() => toggleEditField("imageUrl")}
              >
                + Editar imagen del vino
              </h2>
              {editFields.imageUrl && (
                <>
                  <div>
                    <label
                      htmlFor="productimageUrl"
                      className=" text-slate-900"
                    >
                      Nueva imagen:
                    </label>
                  </div>
                  <div className="flex flex-col items-start justify-center my-3">
                    <input
                      id="productimageUrl"
                      className="text-xs w-full h-[35px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      type="url"
                      placeholder="Ingrese la URL de la imagen del vino"
                      name="productimageUrl"
                      value={valueProductImageUrl}
                      onFocus={focusProductImageUrl}
                      onBlur={blurProductImageUrl}
                      onChange={onChangeProductImageUrl}
                    />
                  </div>
                </>
              )}
              <div className="pt-2">
                <h2
                  htmlFor="editprice"
                  className=" cursor-pointer text-[#bb2700] py-1"
                  onClick={() => toggleEditField("price")}
                >
                  + Editar precio del vino
                </h2>
                {editFields.price && (
                  <>
                    <div>
                      <label htmlFor="productprice" className=" text-slate-900">
                        Nuevo precio:
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
                    </div>
                  </>
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
            <div className="my-6 space-y-3">
              <button
                className={`bg-slate-500 text-white p-1 rounded-md w-full ${
                  selectedBrand === null || selectedProduct === null
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={selectedBrand === null || selectedProduct === null}
              >
                Editar
              </button>
            </div>
          </div>
        </form>
        <div className="m-4">
          <button
            className={`bg-[#bb2700] text-white p-1 rounded-md w-full ${
              selectedProduct === null ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={selectedProduct === null}
            onClick={handleDeleteProduct}
          >
            Eliminar
          </button>
        </div>
      </div>
      <Link href="/manage-products" className=" text-slate-900 underline pb-6">
        Volver
      </Link>
    </div>
  );
};

export default UpdateProduct;
