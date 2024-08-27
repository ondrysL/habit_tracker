import { Outlet } from "react-router-dom"
import { useAuth } from "./contexts/AuthProvider"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Topbar from "./components/Topbar"
import useCreateDailyStats from "./hooks/useCreateDailyStats"

function App() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const createDailyStatAndNavigate = async () => {
      if (user) {
        await useCreateDailyStats(user)
        navigate("/homepage")
      } else {
        navigate("/login")
      }
    }

    createDailyStatAndNavigate()

  }, [user])

  return (
    <>
      {user && <Topbar />}
      <Outlet />
    </>
  )
}

export default App
