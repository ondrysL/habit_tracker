const LoginForm = ({ handleSubmit, loading, error }) => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
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
          <button type="submit" className="auth-btn-dark-green">Login</button>
          <button type="submit" className="auth-btn-dark-green">Login with Google</button>
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-800">{error} Try again</p>}
    </div>
  )
}

export default LoginForm
