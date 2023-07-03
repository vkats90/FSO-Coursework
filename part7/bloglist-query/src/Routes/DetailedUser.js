import { useQuery } from 'react-query'
import userService from '../services/users'
import { useParams } from 'react-router-dom'

const DetailedUser = () => {
  const id = useParams().id
  const users = useQuery('users', () => userService.getUsers().then((users) => users), {
    refetchOnWindowFocus: false,
    retry: 1,
  })
  if (users.isLoading) return <p>Loading...</p>

  const user = users.data.data.find((n) => n.id === id)
  console.log(user)

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default DetailedUser
