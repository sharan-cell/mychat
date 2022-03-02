import { createContext, useEffect, useState } from "react";

import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import Loader from './Loader';


export const AuthContext= createContext();
const AuthProvider = ({children}) =>{
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   
   useEffect(() =>{
      onAuthStateChanged(auth,(user) =>{
         setUser(user);
         setLoading(false);
      });
   }, []);
   if (loading){
      return <Loader/>;
   }
   
    return (<AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>);

 
};


 
 export default AuthProvider;