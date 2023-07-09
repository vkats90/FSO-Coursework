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
		<div
			className="square xyz-in item-group w-max bg-gradient-to-b from-white to-purple-50 border-2 border-purple-200 m-8 p-5 rounded-lg pb-10"
			xyz="fade right-3 duration-5 stagger-1"
		>
			<form onSubmit={logIn}>
				<div>
					<input
						type="text"
						name="Username"
						value={username}
						onChange={({ target }) => {
							setUsername(target.value)
						}}
						className="border rounded-md text-left m-1 pl-2"
						placeholder="username"
					/>
				</div>
				<div>
					<input
						type="password"
						name="Password"
						value={password}
						onChange={({ target }) => {
							setPassword(target.value)
						}}
						className="border rounded-md text-left m-1 pl-2"
						placeholder="password"
					/>
				</div>
				<button
					type="submit"
					className=" hover:text-purple-300  hover:border-purple-300 transition duration-150 font-medium border rounded-md p-1 px-3"
				>
					Login
				</button>
			</form>
		</div>
	)
}

export default LoginForm
