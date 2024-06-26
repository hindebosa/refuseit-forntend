import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'

import { toast } from 'react-toastify';
import { User } from 'src/utils/types';


interface AuthContextType {
  user: User | null;
  login: (email:string,password:string) => Promise<boolean>;
  logout: () => void;
  signUp:(userData:User)=> void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async(email:string,hash:string) => {
    const result = await axios.post(
        `${apiUrl}/auth/email/login`,
        {email, hash,}
      );

       if(result.data.success){
        setUser(result.data.data.user);
        localStorage.setItem('user', JSON.stringify(result.data.data.user));
        toast.success("Successfully login")
       return   true;
       }
       return  false
  };

  const logout = () => {

    setUser(null);
    localStorage.removeItem('user');
  };

  const signUp=(userData:User)=>{

  }

  return (
    <AuthContext.Provider value={{ user, login, logout,signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
