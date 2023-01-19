import {useState,createContext} from 'react'

export const AuthContext = createContext();

export default function Context({children}) {
    const [user,setUser] = useState(null)
    console.log(user,'okok22288o');
  return (
   <AuthContext.Provider value={{user,setUser}}>
       {children}
   </AuthContext.Provider>
  )
}