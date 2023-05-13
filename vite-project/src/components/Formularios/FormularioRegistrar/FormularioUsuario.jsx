
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../../redux/Actions/Actions";

const FormularioIngresa = () => {

  const dispatch = useDispatch();
  const db = useSelector((state)=>state.usuarios)
console.log(db);

  const [usuario, setUsuario] = useState({
    username:"",
    correo:"",
    contraseña:"",
    repetir:"",
    recordar: false,
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUsuario({...usuario, [property]: value})
  }

  console.log(usuario);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(usuario.username === '' || usuario.correo === '' || usuario.contraseña === '' || usuario.repetir === '') return alert('Necesitas completar las áreas');
    if(db.find(user=>user.correo === usuario.correo || user.username === usuario.username)){return alert("El correo o usuario ya existe")};
    if(usuario.contraseña !== usuario.repetir){return alert("La contraseña no coincide")}
    else{ {window.location.href = "Home";} alert("usuario creado") }
    

    setUsuario({
        username:'',
        correo: '',
        contraseña: '',
        repetir:"",
    });

}

    return(

        <div className="container">

<form onSubmit={handleSubmit}>

    <h1 className="h3 mb-3 fw-normal">Ingresa</h1>

    <div className="form-floating">
      <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChange} value={usuario.username} name="username"/>
      <label>Username</label>
    </div>

    <div className="form-floating">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChange} value={usuario.correo} name="correo"/>
      <label>Email</label>
    </div>
  
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handleChange} value={usuario.contraseña} name="contraseña"/>
      <label>Contraseña</label>
    </div>

    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handleChange} value={usuario.repetir} name="repetir"/>
      <label>Repetir Contraseña</label>
    </div>

    <div className="checkbox">
    <input className="box" type="checkbox" value="remember-me" indeterminate/>
      <label>Recordar</label>
    </div>
    
    <button className="w-100 btn btn-lg btn-warning" type="submit">Registrar</button>
    
    
  </form>

  <a href="$"> Olvidé mi contraseña </a>
        </div>
    )
}

export default FormularioIngresa;