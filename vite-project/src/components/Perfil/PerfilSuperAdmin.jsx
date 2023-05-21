import { NavBar, Footer, PedirLocalStorage,GetUsers } from "../Index";

const PerfilSuperAdmin = () => {
    let User = PedirLocalStorage();

    return (
        <>
            <NavBar />
            <section>
                <div>
                    <h1>{`Bienvenido ${User.username}`}</h1>
                    <h3>{`tu email es ${User.email}`}</h3>
                </div>
            </section>
            <section>
                <div>
                    <h1>Usuarios</h1>
                    <GetUsers/>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default PerfilSuperAdmin;