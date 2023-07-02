import { useState, useContext } from 'react'
import Context from '../Context'
import loginService from '../services/users'
import blogService from '../services/blogs'

const LoginForm = () => {
  const [notification, setMessage, user, setUser] = useContext(Context)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const logIn = async (event) => {
    event.preventDefault()
    console.log(`${username} is logging in`)

    let loggedUser = await loginService.login({ username, password })

    if (loggedUser.error) {
      setMessage(loggedUser.error, 'red')
      return console.log(JSON.stringify(loggedUser))
    }

    console.log(`${loggedUser.data.name} has logged in`)
    window.localStorage.setItem('user', JSON.stringify(loggedUser.data))
    setUser(loggedUser.data)
    blogService.setToken(loggedUser.data.token)
    setMessage(`${loggedUser.data.username} has logged in`, 'darkgreen')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={logIn}>
        <div>
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
