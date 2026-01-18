export interface BlogType {
  id?: string
  title: string
  author: string
  url: string
  year: number
  likes: number
  user?: UserType
  readBy?: [BlogType]
}

export interface UserType {
  id: string
  username: string
  name: string
  passwordHash: string
  blogs?: [BlogType]
  readings?: [BlogType]
}

export type NoteType = {
  error?: string
  message?: string
}

export interface AppContextType {
  user: UserType | null
  setUser: (user: UserType | null) => void
  blogs: BlogType[]
  setBlogs: (blogs: BlogType[] | ((prev: BlogType[]) => BlogType[])) => void
  note: NoteType | null
  setNote: (note: NoteType | null | ((prev: NoteType | null) => NoteType)) => void
}
