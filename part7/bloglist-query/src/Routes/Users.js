import User from '../components/User'
import { useQuery } from 'react-query'
import userService from '../services/users'

const Users = () => {
  const users = useQuery('users', () => userService.getUsers().then((users) => users), {
    refetchOnWindowFocus: false,
    retry: 1,
  })
  console.log(users)

  return (
    <div>
      <h2>Users</h2>
      {users.isLoading ? (
        <p>Loading...</p>
      ) : users.isError ? (
        <p>{users.error.message}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th width="200">username</th>
              <th>blogs created</th>
            </tr>
          </thead>

          {users.data.data.map((user) => (
            <User user={user} key={user.id} />
          ))}
        </table>
      )}
    </div>
  )
}

export default Users
