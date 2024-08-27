import { createContext, useState, useEffect, useContext } from "react"
import { auth } from "../config/FirebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import useCreateUserStats from "../hooks/useCreateUserStats"
import useCreateDailyStats from "../hooks/useCreateDailyStats"

export const AuthContext = createContext(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setError(null)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInEmailPass = async (email: string, password: string) => {
    try {
      setLoading(true)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError(err.message)
      console.log(err)
    }
  }

  const createAccountEmailPass = async (email: string, password: string) => {
    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await useCreateUserStats(userCredential.user)
    } catch (err) {
      setError(err.message)
      console.log(err)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await signOut(auth)
    } catch (err) {
      console.log(err)
    }
  }

  const authValue = { signInEmailPass, createAccountEmailPass, logout, user, loading, error }

  return <AuthContext.Provider value={authValue}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider
