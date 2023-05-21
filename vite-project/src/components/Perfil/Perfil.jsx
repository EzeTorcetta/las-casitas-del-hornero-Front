import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PedirLocalStorage, PerfilColaborador, PerfilSuperAdmin, PerfilUsuario } from "../Index";

const Perfil = ({countCarrito,setCountCarrito}) => {
    let User = PedirLocalStorage();
    const navigate = useNavigate();

    useEffect(() => {
    if (!User) {
        navigate("/Home");
    }
    }, [User, navigate]);

    if (!User) {
        return null;
    }

    let { rol } = User;

    return (
        <>
        {
            rol===1?(
                <PerfilUsuario
                  countCarrito={countCarrito}
                  setCountCarrito={setCountCarrito}
                />
            ):rol===2?(
                <PerfilColaborador/>
            ):rol===3?(
                <PerfilSuperAdmin/>
            ):(
                <></>
            )
        }
        </>
    );
};

export default Perfil;