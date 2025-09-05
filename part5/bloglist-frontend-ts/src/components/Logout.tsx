import { useAppData } from '../context/context'

const LogOut = () => {
  const { setUser } = useAppData()

  const handleLogOut = () => {
    window.sessionStorage.removeItem('user')
    setUser(null)
  }
  return (
    <button
      onClick={handleLogOut}
      className="absolute border-0 rounded-md p-2 bg-slate-200 cursor-pointer m-2 top-0 right-0 z-40"
    >
      Log Out
    </button>
  )
}

export default LogOut
