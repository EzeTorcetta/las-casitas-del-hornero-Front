import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PedirLocalStorage } from "../Index";
import { changeRol, getUsers } from "../../redux/Actions/Actions";
import style from "./GetUser.module.css";
import imagenUsuario from "../../image/usuario (1).png";

const GetUsers = () => {
  const dispatch = useDispatch();
  const user = PedirLocalStorage();
  const users = useSelector((state) => state.Users);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserRole, setSelectedUserRole] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const idioma = useSelector((state) => state.idioma);

  const translations = {
    es: {
      Usuario: "Usuario",
      Partner: "Socio",
      Confirmar: "Confirmar",
    },
    en: {
      Usuario: "User",
      Partner: "Partner",
      Confirmar: "Confirm",
    },
  };

  useEffect(() => {
    dispatch(getUsers(user.id));
  }, [dispatch, user.id]);

  const handleRoleChange = () => {
    const data = {
      id_user: selectedUserId,
      rol: selectedUserRole,
    };
    dispatch(changeRol(data));
    setShowOptions(false);
    setTimeout(() => {
      dispatch(getUsers(user.id));
    }, 200);
  };

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
    setShowOptions(true);
  };

  return (
    <div className={style.container}>
      {users?.map((usuario) => (
        <div key={usuario.id} className={style.card}>
          <img className={style.img} src={imagenUsuario} alt="Perfil" />
          <h3>{usuario.username}</h3>
          <p>{usuario.email}</p>
          {usuario.rol === 1 && <p>rol: {translations[idioma].Usuario}</p>}
          {usuario.rol === 2 && <p>rol: {translations[idioma].Partner}</p>}
          {usuario.rol === 3 && <p>rol: superadmin</p>}
          <button onClick={() => handleSelectUser(usuario.id)}>
            Cambiar rol
          </button>
          {showOptions && selectedUserId === usuario.id && (
            <>
              <select
                value={selectedUserRole}
                onChange={(e) => setSelectedUserRole(e.target.value)}
              >
                <option hidden>seleccionar rol</option>
                <option value={1}>{translations[idioma].Usuario}</option>
                <option value={2}>{translations[idioma].Partner}</option>
                <option value={3}>superadmin</option>
              </select>
              <button className={style.confirm} onClick={handleRoleChange}>
                {translations[idioma].Confirmar}
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default GetUsers;
