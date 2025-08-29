export interface BlogType {
  id: string
  title: string
  author: string
  url: string
  likes: string
  user?: UserType
}

export interface UserType {
  id: string
  username: string
  name: string
  passwordHash: string
  blogs?: [string]
}
