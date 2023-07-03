import { useState } from 'react'

const User = ({ user }) => {
  const [visible, setVisible] = useState(false)
  return (
    <tbody>
      <tr>
        <td>{user.username}</td>
        <td>{user.blogs.length}</td>
      </tr>
    </tbody>
  )
}

export default User
