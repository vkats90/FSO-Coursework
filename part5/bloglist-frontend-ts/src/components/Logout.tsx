import { useAppData } from '../App'

const LogOut = () => {
  const { setUser } = useAppData()

  const handleLogOut = () => {
    window.sessionStorage.removeItem('user')
    setUser(null)
  }
  return (
    <button
      onClick={handleLogOut}
      className="absolute border-0 rounded-md p-2 bg-slate-200 cursor-pointer m-2 top-0 right-0"
    >
      Log Out
    </button>
  )
}

export default LogOut
