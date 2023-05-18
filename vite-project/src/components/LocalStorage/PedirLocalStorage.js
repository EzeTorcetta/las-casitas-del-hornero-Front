const PedirLocalStorage = () => {
  const usuarioJSON = localStorage.getItem("Usuario");

  if (usuarioJSON) {
    return JSON.parse(usuarioJSON);
  } else {
    console.log("No se encontró nada en el LocalStorage");
    return null; // Valor predeterminado o puedes devolver otro valor que consideres apropiado
  }
};

export default PedirLocalStorage;
