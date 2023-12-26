import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import { checkAuthStatus, loginUser, logoutUser, signupUser } from '../helpers/api-communicator';

type User ={
name:string,
email:string
}

type UserAuth={
    user:User | null,
    isLoggedIn:boolean,
    login:(email:string,password:string)=>Promise<void>,
    signup:(name:string,email:string,password:string)=>Promise<void>,
    logout:()=>Promise<void>
}


const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider=({children}:{children:ReactNode})=>{
    const [user,setUser]=useState<User | null>(null);
    const [isLoggedIn,setLoggedIn] = useState<boolean>(false);

    useEffect(()=>{
        async function checkStatus() {
            const data = await checkAuthStatus();
            if(data){
                setUser({email:data.email,name:data.name});
                setLoggedIn(true);
            }
        }
        checkStatus();
    },[])

    const login = async (email:string,password:string):Promise<void>=>{
        const data =await loginUser(email,password);
        if(data){
            setUser({email:data.email,name:data.name});
            setLoggedIn(true);
        }
    }

    const signup =async (name:string,email:string,password:string):Promise<void>=>{
        const data =await signupUser(name,email,password);
        if(data){
            setUser({email:data.email,name:data.name});
            setLoggedIn(true);
        }
    }

    const logout =async():Promise<void>=>{
        await logoutUser();
        setLoggedIn(false);
        setUser(null);
        window.location.reload();
    }

    const value = {
        user,
        isLoggedIn,
        login,
        signup,
        logout
    }

    return<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
       
   
}
export const useAuth=()=> useContext(AuthContext);
