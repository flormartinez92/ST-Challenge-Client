"use client";

import useInput from "@/hooks/useInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const [messageAlert, setMessageAlert] = useState("");
  const [messageOk, setMessageOk] = useState("");
  const {
    onChange: onChangeName,
    value: valueName,
    onBlur: blurName,
    onFocus: focusName,
    errorMessage: messageName,
  } = useInput("name");
  const {
    onChange: onChangeLastname,
    value: valueLastname,
    onBlur: blurLastname,
    onFocus: focusLastname,
    errorMessage: messageLastname,
  } = useInput("lastname");
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

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (
      valueName.trim() == "" ||
      valueLastname.trim() == "" ||
      valueUsername.trim() == "" ||
      valuePassword.trim() == ""
    ) {
      setMessageAlert("¡Completar todos los campos!");
      setTimeout(() => {
        setMessageAlert("");
      }, 1300);
    } else {
      if (
        messageName ||
        messageLastname ||
        messageUsername ||
        messagePassword
      ) {
        setMessageAlert("¡Verificar campos!");
        setTimeout(() => {
          setMessageAlert("");
        }, 1300);
      } else {
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`,
            {
              name: valueName,
              lastname: valueLastname,
              username: valueUsername,
              password: valuePassword,
            },
            { withCredentials: true }
          );
          setMessageAlert("");
          setMessageOk("¡Bienvenido!");
          router.push("/login");
        } catch (error) {
          console.error(error);
          const { data } = error.response;
          if (data === "Username already exists") {
            setMessageAlert("¡Nombre de usuario existente!");
            setTimeout(() => {
              setMessageAlert("");
            }, 1300);
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-230px)]">
      <div className=" border-2 m-8 p-2 rounded-sm w-[280px]">
        <form onSubmit={onSubmitForm}>
          <div className="m-4">
            <div>
              <div>
                <label htmlFor="name" className=" text-slate-900">
                  Nombre:
                </label>
              </div>
              <div className="flex flex-col items-start justify-center my-3">
                <input
                  id="name"
                  className="text-xs w-full h-[30px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  type="text"
                  placeholder="Ingrese su nombre"
                  name="name"
                  value={valueName}
                  onFocus={focusName}
                  onBlur={blurName}
                  onChange={onChangeName}
                />
                <div className="h-[.5rem] p-1">
                  {messageName && (
                    <p className="text-red-500 text-[11px]">{messageName}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-2">
              <div>
                <label htmlFor="lastname" className=" text-slate-900">
                  Apellido:
                </label>
              </div>
              <div className="flex flex-col items-start justify-center my-3">
                <input
                  id="lastname"
                  className=" text-xs w-full h-[30px] border border-gray-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  type="text"
                  placeholder="Ingrese su apellido"
                  name="lastname"
                  value={valueLastname}
                  onFocus={focusLastname}
                  onBlur={blurLastname}
                  onChange={onChangeLastname}
                />
                <div className="h-[.5rem] p-1">
                  {messageLastname && (
                    <p className="text-red-500 text-[11px]">
                      {messageLastname}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-2">
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
                  placeholder="Ingrese un nombre de usuario"
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
                Registrarse
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
