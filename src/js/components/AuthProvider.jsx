import { createContext, useState } from "react"

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLogged, setIsLogged] = useState(localStorage.getItem('access-token') ? true : false);

  const contextValue = {
    isLogged,
    setIsLogged
  }
  
  return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>)
}