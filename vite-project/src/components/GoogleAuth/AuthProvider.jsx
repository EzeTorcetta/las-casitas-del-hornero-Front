import { auth, getUserInfo, registerNewUser, userExists } from "../../Firebase/Firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GuardarLocalStorage } from "../Index";
import axios from "axios";

const AuthProvider = ({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          const userInfo = await getUserInfo(user.uid);
          if (userInfo.processCompleted) {
            console.log(userInfo)
            let userBack = {
              password: userInfo.uid,
              email: userInfo.correo,
            }
            try{
              const userActual = await axios.post('https://las-casitas-del-hornero-back-deploy.up.railway.app/user', userBack);
              console.log(userActual);
              GuardarLocalStorage({
                id:userActual.data.id,
                email: userActual.data.email,
                username: userActual.data.username,
                rol: userActual.data.rol,
              });
            }catch(error){
              console.log(2);
              const userBack = {
                password: userInfo.uid,
                email: userInfo.correo,
                username: userInfo.displayName
              }
              await axios.post('https://las-casitas-del-hornero-back-deploy.up.railway.app/user', userBack);

              const userBack2 = {
                password: userInfo.uid,
                email: userInfo.correo,
                username: userInfo.displayName
              }
              const userActual = await axios.post('https://las-casitas-del-hornero-back-deploy.up.railway.app/user', userBack2);
              GuardarLocalStorage({
                id:userActual.id,
                email: userActual.email,
                username: userActual.username,
                rol: userActual.rol,
              });
            }
            onUserLoggedIn(userInfo);
          } else {
            onUserNotRegistered(userInfo);
          }
        } else {
          const newUser = {
            uid: user.uid,
            displayName: user.displayName,
            profilePicture: '',
            username: user.displayName,
            processCompleted: false,
            correo: user.email,
          };
          await registerNewUser(newUser);
          // Enviar información al backend para crear el usuario
          const userBack = {
            password: newUser.uid,
            email: newUser.correo,
            username: newUser.displayName
          }
          await axios.post('https://las-casitas-del-hornero-back-deploy.up.railway.app/user', userBack);

          const userBack2 = {
            password: newUser.uid,
            email: newUser.correo,
            username: newUser.displayName
          }
          const userActual = await axios.post('https://las-casitas-del-hornero-back-deploy.up.railway.app/user', userBack2);
          GuardarLocalStorage({
            id:userActual.id,
            email: userActual.email,
            username: userActual.username,
            rol: userActual.rol,
          });
          onUserNotRegistered(newUser);
        }
      } else {
        onUserNotLoggedIn();
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);

  return <div>{children}</div>;
}

export default AuthProvider;
