//?---------------------------- IMPORTS --------------------------------
import React, { useState } from "react";
import axios from "axios";

//?----------------- COMPONENTE UPLOAD IMAGE ------------------------------------
const UploadImage = () => {
  const [image, setImage] = useState("");

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "La_Casita_Del_Hornero");
    const res = await axios.post(`https://api.cloudinary.com/v1_1/dhe1t8gs0/image/upload`, data);    
    setImage(res.secure_url);
  };

  return (
    <div>
      <h1>Subir imagen</h1>
      <input
        type="file"
        name="image"
        placeholder="arrastra la imagen aquí"
        onChange={uploadImage}
      />

    </div>
  );
};

export default UploadImage;
