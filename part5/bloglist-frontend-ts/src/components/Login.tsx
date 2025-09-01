import { useState, type FormEvent } from 'react'
import loginService from '../../services/login'
import { useAppData } from '../context/context'

const Login = () => {
  const [un, setUN] = useState('')
  const [pw, setPW] = useState('')
  const { setUser, setNote } = useAppData()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    ;(async () => {
      const response = await loginService.login(un, pw)
      if (response.error) {
        setUN('')
        setPW('')
        return setNote(response)
      }
      setUser(response)
      setUN('')
      setPW('')
      setNote({ message: `Welcome ${response.name}` })
    })()
  }

  return (
    <div>
      <form
        className="flex flex-col w-fit p-6 m-auto border-0 rounded-md bg-slate-200 justify-items-end"
        onSubmit={handleSubmit}
      >
        <label className="justify-self-end">
          Username
          <input
            className="border-0 rounded-sm bg-white mx-3 mr-0"
            onChange={({ target }) => setUN(target.value)}
            value={un}
          />
        </label>
        <label className="justify-self-end">
          Password
          <input
            className="border-0 rounded-sm bg-white mx-4 my-2 mr-0"
            onChange={({ target }) => setPW(target.value)}
            value={pw}
          />
        </label>
        <button
          type="submit"
          className="border-0 rounded-md p-2 cursor-pointer bg-slate-100 hover:bg-slate-400"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
