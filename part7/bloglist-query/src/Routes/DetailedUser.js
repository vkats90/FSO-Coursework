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
    <div className="relative blog_url_likes w-max bg-gradient-to-b from-white to-purple-50 border-2 border-purple-200 m-8 p-5 rounded-lg">
      <h2 className="text-2xl py-5 font-bold text-purple-800">{user.name}</h2>
      <h3 className="py-3">added blogs:</h3>
      <ul className="p-3">
        {user.blogs.map((blog) => (
          <li className="list-disc list-inside text-gray-500" key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DetailedUser
