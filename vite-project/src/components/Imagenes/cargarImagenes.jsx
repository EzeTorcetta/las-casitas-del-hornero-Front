//?---------------------------- IMPORTS --------------------------------
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

//?----------------- COMPONENTE UPLOAD IMAGE ------------------------------------
const UploadImage = () => {
  const [image, setImage] = useState("");

  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      SubirImagen: "Upload image",
      Arrastra: "drag image here",
    },
    es: {
      SubirImagen: "Subir imagen",
      Arrastra: "arrastra la imagen aquí",
    },
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "La_Casita_Del_Hornero");
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dhe1t8gs0/image/upload`,
      data
    );
    setImage(res.secure_url);
  };

  return (
    <div>
      <h1>{translations[idioma].SubirImagen}</h1>
      <input
        type="file"
        name="image"
        placeholder={translations[idioma].Arrastra}
        onChange={uploadImage}
      />
    </div>
  );
};

export default UploadImage;
