import { useDispatch, useSelector } from "react-redux";
import { PedirLocalStorage } from "../Index";
import { useEffect, useState } from "react";
import { changeRol, getUsers } from "../../redux/Actions/Actions";
import style from "./GetUser.module.css";
import MUIDataTable from "mui-datatables";
// import DataTable, { createTheme } from "react-data-table-component";

const GetUsers = () => {
  const dispatch = useDispatch();
  const user = PedirLocalStorage();
  const users = useSelector((state) => state.Users);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserRole, setSelectedUserRole] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  console.log(selectedUserRole);

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
    console.log(userId);
    setSelectedUserId(userId);
    setShowOptions(true);
  };

  const columnas = [
    "id",
    "username",
    "email",
    {
      name: "rol",
      label: "Rol",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          //* customBodyRender sirve para modificar o actualizar un valor de la tabla
          const userId = tableMeta.rowData[0]; // Obtén el ID del usuario desde los datos de la fila
          return (
            <div>
              {showOptions && selectedUserId === userId ? (
                <select
                  className={style.select}
                  value={selectedUserRole}
                  onChange={(e) => setSelectedUserRole(e.target.value)}
                >
                  <option value="2">Admin</option>
                  <option value="1">User</option>
                  <option value="3">Superadmin</option>
                </select>
              ) : (
                value
              )}
              <button
                className={style.botonRol}
                onClick={() => handleSelectUser(userId)}
              >
                Editar Rol
              </button>
              {showOptions && selectedUserId === userId && (
                <button
                  className={style.botonGuardar}
                  onClick={handleRoleChange}
                >
                  Guardar
                </button>
              )}
            </div>
          );
        },
      },
    },
  ];
  const options = {
    selectableRows: false, // Desactivar checkboxes en cada fila
  };

  return (
    <div className={style.ContainerDeTodosLosUser}>
      <div className={style.divMuiTable}>
        <MUIDataTable
          title="Lista De Usuarios"
          data={users}
          columns={columnas}
          options={options}
        />
      </div>

      {/* <MaterialTable columnas={columnas} data={users} /> */}
      {/* {users?.map((usuario) => (
        <div className={style.ContainerUser} key={usuario.id}>
          {usuario.rol === 1 && <p>rol: Usuario</p>}
          {usuario.rol === 2 && <p>rol: Partner</p>}
          {usuario.rol === 3 && <p>rol: superadmin</p>}

          <button
            className={style.BotonRol}
            onClick={() => handleSelectUser(usuario.id)}
          >
            Cambiar rol
          </button>

          {showOptions && selectedUserId === usuario.id && (
            <>
              <select
                className={style.selectUserRole}
                value={selectedUserRole}
                onChange={(e) => setSelectedUserRole(e.target.value)}
              >
                <option hidden>seleccionar rol</option>
                <option value={1}>Usuario</option>
                <option value={2}>Partner</option>
                <option value={3}>superadmin</option>
              </select>
              <button
                className={style.BotonConfirmar}
                onClick={handleRoleChange}
              >
                Confirmar
              </button>
            </>
          )}
        </div>
      ))}
    ); */}
    </div>
  );
};

export default GetUsers;
