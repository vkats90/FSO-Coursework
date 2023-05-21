import { useState } from 'react'

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    handleSubmit({ username, password })
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
