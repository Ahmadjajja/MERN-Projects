import React, { createContext, useState, useEffect } from 'react'      //diff b/w createContext and UseContext?
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'Config/Firebase';
export const AuthenticatedContext = createContext();

function AuthenticatedContextProvider(props) {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoader, setIsLoader] = useState(true)
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState({})
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        // console.log(user)
        setUser(user)
      } else {
        setIsAuthenticated(false)
        // console.log("user is not logged in")
      }
      setIsLoader(false)
    })
  }, [])

  return (
    <AuthenticatedContext.Provider value={{ isAuthenticated, isLoader, setIsAuthenticated, user, userId, setUserId}}>
      {props.children}
    </AuthenticatedContext.Provider>
  )
}
export default AuthenticatedContextProvider