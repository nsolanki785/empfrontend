import { createContext } from "react";
export const auth =  localStorage.getItem('secure-token');

export const AthentificationToken = createContext();
export const UserData = createContext(); 
