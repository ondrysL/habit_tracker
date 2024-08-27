import { useAuth } from "../contexts/AuthProvider"
import { Navigate } from "react-router-dom"

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth()

  return user ? children : <Navigate to="/login" />
}

export default PrivateRouter
