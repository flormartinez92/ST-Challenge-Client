import { useState } from "react";

function useInput(type) {
  const [value, setValue] = useState("");

  const onChange = (e) => setValue(e.target.value);

  const validate_types = {
    name: [
      {
        condition: (val) => val.trim() !== "",
        error: "*Debe proporcionar un nombre",
      },
    ],
    lastname: [
      {
        condition: (val) => val.trim() !== "",
        error: "*Debe proporcionar un apellido",
      },
    ],
    username: [
      {
        condition: (val) => val.trim() !== "",
        error: "*Nombre de usuario no puede estar vacío",
      },
    ],
    password: [
      {
        condition: (val) => val.trim() !== "",
        error: "*La contraseña no puede estar vacía",
      },
    ],
    brandname: [
      {
        condition: (val) => val.trim() !== "",
        error: "*Proporcionar un nombre de bodega",
      },
    ],
    brandlogo: [
      {
        condition: (val) => val.trim() !== "",
        error: "*Debe proporcionar un logo",
      },
    ],
    productname: [
      {
        condition: (val) => val.trim() !== "",
        error: "*Proporcionar un nombre de vino",
      },
    ],
    productdescription: [
      {
        condition: (val) => val.trim() !== "",
        error: "*Proporcionar una descripción",
      },
    ],
    productimageUrl: [
      {
        condition: (val) => val.trim() !== "",
        error: "*Proporcionar una imagen",
      },
    ],
    productprice: [
      {
        condition: (val) => val.trim() !== "",
        error: "*Proporcionar un precio",
      },
      {
        condition: (val) => /^[0-9]+$/.test(val),
        error: "*El precio debe ser un número",
      },
    ],
  };

  const [errorMessage, setErrorMessage] = useState("");

  const onBlur = () => {
    let message = "";
    const validation = validate_types[type];
    if (!validation) return;
    for (const key in validation) {
      const { error, condition } = validation[key];
      if (!condition(value)) {
        message = error;
        break;
      }
    }
    setErrorMessage(message);
  };

  const onFocus = () => setErrorMessage("");

  return {
    errorMessage,
    onBlur,
    onFocus,
    onChange,
    value,
    setValue,
  };
}

export default useInput;
