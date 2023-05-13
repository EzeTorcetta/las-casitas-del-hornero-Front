import "./sign-in.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../../redux/Actions/Actions";

const FormularioIngresa = () => {

  const dispatch = useDispatch();
  const db = useSelector((state)=>state.usuarios)
console.log(db);

  const [usuario, setUsuario] = useState({
    correo:"",
    contraseña:"",
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
    
    if(usuario.correo === '' || usuario.contraseña === '') return alert('Necesitas completar las áreas');
  
    else if(db.find(user=>user.correo === usuario.correo && user.contraseña === usuario.contraseña)){window.location.href = "Home";}
    else {return alert ("Usuario o contraseña equivocada")};
    

    setUsuario({
        correo: '',
        contraseña: '',
    });

}

    return(

        <div className="container">

<form onSubmit={handleSubmit}>

    <h1 className="h3 mb-3 fw-normal">Ingresa</h1>

    <div className="form-floating">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChange} value={usuario.correo} name="correo"/>
      <label>Email</label>
    </div>
  
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handleChange} value={usuario.contraseña} name="contraseña"/>
      <label>Contraseña</label>
    </div>

    <div className="checkbox">
    <input className="box" type="checkbox" value="remember-me" indeterminate/>
      <label>Recordar</label>
    </div>
    
    <button className="w-100 btn btn-lg btn-warning" type="submit">Ingresar</button>
    
    
  </form>

  <a href="$"> Olvidé mi contraseña </a>
        </div>
    )
}

export default FormularioIngresa;