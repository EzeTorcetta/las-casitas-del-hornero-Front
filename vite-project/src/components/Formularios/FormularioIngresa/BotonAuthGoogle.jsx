import { auth } from "../../../Firebase/Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function BotonAuthGoogle () {
    async function handleOnClick () {
        const googleProvider = new GoogleAuthProvider();
        await signInWithGoogle(googleProvider);
    }
    
    async function signInWithGoogle(googleProvider){
        try {
            const res = await signInWithPopup(auth, googleProvider);
            console.log(res);
          } catch (error) {
            console.error(error);
          }
    }
    return(
        <div>
            <button onClick={handleOnClick}>Ingresar con Google</button>
        </div>
    );
  };