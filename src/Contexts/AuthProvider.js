import React, { useContext, useState, useEffect } from "react"
import { auth } from "../Firebase"
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from '@firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [userName,setUserName] = useState()
  const [loading, setLoading] = useState(true)

  
  //console.log(userName)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth,email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(
          auth,email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function signInWithGoogle(){
       const provider = new GoogleAuthProvider()
       return signInWithPopup(auth,provider)
  }

  

/*   function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
 */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
      setUserName(user?.displayName)
      console.log(currentUser)
    })

    return unsubscribe
  }, [])

  const value = {
    userName,
    setUserName,
    currentUser,
    login,
    signup,
    logout,
    signInWithGoogle
 /*    resetPassword,
    updateEmail,
    updatePassword */
  }
  //console.log(userName)

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}