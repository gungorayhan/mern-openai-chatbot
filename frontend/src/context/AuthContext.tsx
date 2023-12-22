import {ReactNode, createContext, useContext, useEffect, useState} from 'react';

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

    },[])

    const login = async (email:string,password:string):Promise<void>=>{

    }

    const signup =async (name:string,email:string,pasword:string):Promise<void>=>{

    }

    const logout =async():Promise<void>=>{

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
