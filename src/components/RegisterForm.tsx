const RegisterForm = ({ handleSubmit }) => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-8">Register</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <label className="text-dark-green text-sm">Email</label>
          <input type="text" name="email" placeholder="Email..." className="auth-input" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="text-dark-green text-sm">Password</label>
          <input type="password" name="password" placeholder="Password..." className="auth-input" />
        </div>
        <div className="flex gap-x-4">
          <button type="submit" className="auth-btn-dark-green">Register</button>
          <button type="submit" className="auth-btn-dark-green">Register with Google</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
