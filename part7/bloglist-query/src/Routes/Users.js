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
    <div className="w-max bg-gradient-to-b from-white to-purple-50 border-2 border-purple-200 m-8 p-5 rounded-lg pb-10">
      <h2 className="text-3xl py-5 font-bold text-purple-800">Users</h2>
      {users.isLoading ? (
        <p>Loading...</p>
      ) : users.isError ? (
        <p>{users.error.message}</p>
      ) : (
        <table>
          <thead>
            <tr className="text-purple-600 text-left">
              <th width="200">Username</th>
              <th width="200">blogs</th>
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
