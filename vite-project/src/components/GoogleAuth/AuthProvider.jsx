// import { auth, getUserInfo, registerNewUser, userExists } from "../../Firebase/Firebase";
// import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
// import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';

// const AuthProvider = ({
//     children,
//     onUserLoggedIn,
//     onUserNotLoggedIn,
//     onUserNotRegistered,
// }) => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         onAuthStateChanged(auth, async (user) => {
//         if(user){
//           const isRegistered = await userExists(user.uid);
//           if(isRegistered){
//             const userInfo = await getUserInfo(user.uid);
//             if(userInfo.processCompleted){
//               onUserLoggedIn(userInfo);
//             }else{
//               onUserNotRegistered(userInfo);
//             }
//           } else {
//             await registerNewUser({
//               uid: user.uid,
//               displayName: user.displayName,
//               profilePicture: '',
//               username: '',
//               processCompleted: false,
//             });
//             onUserNotRegistered(user);
//             console.log(user.displayName);
//           }
//         } else {
//             onUserNotLoggedIn();
//         }
//       });
//       }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);

//       return <div>{children}</div>;
// }

// export default AuthProvider;
