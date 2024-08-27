import { useAuth } from "../contexts/AuthProvider"
import { IoLogOutOutline } from "react-icons/io5";
import { GiHabitatDome } from "react-icons/gi";

const Topbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="h-[6vh] flex items-center justify-between px-4 border-[1px] border-b-dark-green">
      <div className="flex items-center justify-center gap-x-8">
        <GiHabitatDome size={32} color="#708871" />
        <p className="font-bold text-lg text-text-color">Welcome, {user?.email}</p>
      </div>
      <button onClick={logout}>
        <IoLogOutOutline size={32} color="#708871" />
      </button>
    </nav>
  )
}

export default Topbar
