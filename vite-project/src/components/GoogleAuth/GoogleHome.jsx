// import { useNavigate } from "react-router-dom";
// import AuthProvider from "./AuthProvider";
// import { useState } from "react";

// export const GoogleHome = async () => {
//     const navigate = useNavigate();
//     const [currentUser, setCurrentUser] = useState({});
//     const [state, setState] = useState(0);
//     const handleUserLoggedIn = (user) => {
//         setCurrentUser(user);
//         setState(2)
//       }

//       const handleUserNotRegistered = (user) => {
//         navigate('/Registrar')
//       }

//       const handleUserNotLoggedIn = () => {
//         navigate('/Registrar');
//       }
//       if(state === 2){
//         return<div>
//             <AuthProvider
//                 onUserLoggedIn={handleUserLoggedIn}
//                 onUserNotLoggedIn={handleUserNotLoggedIn}
//                 onUserNotRegistered={handleUserNotRegistered}>t
//             </AuthProvider>
//                 </div>
//       }

//       return<div>
//         <h1>Loading...</h1>
//       </div>
// }
