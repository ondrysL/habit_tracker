import { useState } from "react"
import { useAuth } from "../contexts/AuthProvider"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"

enum AuthType {
  LOGIN,
  REGISTER
}

const AuthPage = () => {
  const { signInEmailPass, createAccountEmailPass, user, loading, error } = useAuth()
  const [authType, setAuthType] = useState(AuthType.LOGIN)

  const handleRegister = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    createAccountEmailPass(email, password)
    console.log(user)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    await signInEmailPass(email, password)
  }

  return (
    <section className="flex flex-col sm:flex-row gap-12 max-sm:items-center justify-center h-[100vh] p-8">
      <div className="sm:w-2/5 flex sm:justify-center">
        {
          authType === AuthType.LOGIN ?
            <LoginForm handleSubmit={handleLogin} loading={loading} error={error} /> :
            <RegisterForm handleSubmit={handleRegister} />
        }
      </div>
      <div className="flex-1 flex flex-col items-center justify-between py-8 bg-dark-green rounded-tl-[50px] rounded-br-[50px]">
        <h1 className="font-poppins text-white font-bold text-4xl text-center leading-[90px] max-sm:w-[90vw] sm:text-4xl">Manage Your Habits</h1>
        <div className="flex justify-end gap-x-4 px-8 w-[100%]">
          <button className="auth-btn" onClick={() => setAuthType(AuthType.LOGIN)}>Login</button>
          <button className="auth-btn" onClick={() => setAuthType(AuthType.REGISTER)}>Register</button>
        </div>
      </div>
    </section>
  )
}

export default AuthPage
