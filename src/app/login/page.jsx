"use client";

import useInput from "@/hooks/useInput";
import { setCredentials } from "@/state/features/authSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [messageAlert, setMessageAlert] = useState("");
  const [messageOk, setMessageOk] = useState("");
  const {
    onChange: onChangeUsername,
    value: valueUsername,
    onBlur: blurUsername,
    onFocus: focusUsername,
    errorMessage: messageUsername,
  } = useInput("username");
  const {
    onChange: onChangePassword,
    value: valuePassword,
    onBlur: blurPassword,
    onFocus: focusPassword,
    errorMessage: messagePassword,
  } = useInput("password");
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (valueUsername.trim() == "" || valuePassword.trim() == "") {
      setMessageAlert("¡Completar todos los campos!");
      setTimeout(() => {
        setMessageAlert("");
      }, 1300);
    } else {
      if (messageUsername || messagePassword) {
        setMessageAlert("¡Verificar campos!");
        setTimeout(() => {
          setMessageAlert("");
        }, 1300);
      } else {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
            {
              username: valueUsername,
              password: valuePassword,
            },
            {
              withCredentials: true,
              credentials: "include",
            }
          );
          dispatch(
            setCredentials({
              username: data.user.username,
              isAdmin: data.user.isAdmin,
              token: data.token,
            })
          );
          setLocalStorage({
            username: data.user.username,
            isAdmin: data.user.isAdmin,
            token: data.token,
          });
          setMessageAlert("");
          setMessageOk("¡Bienvenido!");
          router.push("/");
        } catch (error) {
          console.error(error);
          setMessageAlert("¡Usuario o contraseña incorrectos!");
          setTimeout(() => {
            setMessageAlert("");
          }, 1300);
        }
      }
    }
  };

  const setLocalStorage = (value) => {
    try {
      localStorage.setItem("user", JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-230px)]">
      <div className=" border-2 m-8 p-2 rounded-sm w-[280px]">
        <form onSubmit={onSubmitForm}>
          <div className="m-4">
            <div>
              <div>
                <label htmlFor="username" className=" text-slate-900">
                  Nombre de Usuario:
                </label>
              </div>
              <div className="flex flex-col items-start justify-center my-3">
                <input
                  id="username"
                  className=" text-xs w-full h-[30px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  type="text"
                  placeholder="Ingrese su nombre de usuario"
                  name="username"
                  value={valueUsername}
                  onFocus={focusUsername}
                  onBlur={blurUsername}
                  onChange={onChangeUsername}
                />
                <div className="h-[.5rem] p-1">
                  {messageUsername && (
                    <p className="text-red-500 text-[11px]">
                      {messageUsername}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-2">
              <div>
                <label htmlFor="password" className=" text-slate-900">
                  Contraseña:
                </label>
              </div>
              <div className="flex flex-col items-start justify-center my-3">
                <input
                  id="password"
                  className="text-xs w-full h-[30px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  type="password"
                  placeholder="***********"
                  name="password"
                  value={valuePassword}
                  onFocus={focusPassword}
                  onBlur={blurPassword}
                  onChange={onChangePassword}
                />

                {messagePassword && (
                  <div className="h-[.5rem] p-1">
                    <p className="text-red-500 text-[11px]">
                      {messagePassword}
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
                Iniciar Sesión
              </button>
            </div>
            <div className="flex items-center justify-center gap-x-2 text-sm text-slate-900">
              <p>¿No tenés cuenta?</p>
              <Link href="/register" className="underline">
                Registrate
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
