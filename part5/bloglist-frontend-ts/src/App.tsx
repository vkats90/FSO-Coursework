import { useState, useEffect, createContext, useContext } from 'react'
import BlogList from './components/BlogList'
import LogOut from './components/Logout'
import Login from './components/Login'
import Notification from './components/Notification'
import AddBlog from './components/AddBlog'
import blogService from '../services/blogs'
import type { BlogType, UserType, AppContextType, NoteType } from '../types'
import './App.css'

export const AppData = createContext<AppContextType | null>(null)

export const useAppData = () => {
  const context = useContext(AppData)
  if (!context) throw new Error('context is not defined')
  return context
}

function App() {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [user, setUser] = useState<UserType | null>(null)
  const [note, setNote] = useState<NoteType | null>(null)

  useEffect(() => {
    const storage = window.sessionStorage.getItem('user')
    if (storage) setUser(JSON.parse(window.sessionStorage.getItem('user') as string))
    ;(async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
  }, [])

  return (
    <AppData.Provider value={{ user, setUser, blogs, setBlogs, note, setNote }}>
      {note && <Notification note={note} />}
      <LogOut />
      {user && <div className="m-4 absolute top-0 right-20">Welcome {user.name}</div>}
      <div className="w-full py-10 flex flex-col text-center ">
        <div className="my-8 text-4xl">Blog List App TypeScript</div>
        {!user && <Login />}
        {user && <BlogList blogs={blogs} />}
        {user && <AddBlog />}
      </div>
    </AppData.Provider>
  )
}

export default App
