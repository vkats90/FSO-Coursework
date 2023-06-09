import { useNavigate } from 'react-router-dom'

const User = ({ user }) => {
  const navigate = useNavigate()

  const goTo = (event) => {
    event.preventDefault()
    navigate(`/users/${user.id}`)
  }

  return (
    <tbody>
      <tr>
        <td>
          <a className="hover:text-purple-300" href="" onClick={goTo}>
            {user.username}
          </a>
        </td>
        <td>{user.blogs.length}</td>
      </tr>
    </tbody>
  )
}

export default User
