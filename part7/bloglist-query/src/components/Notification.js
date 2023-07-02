import { useContext } from 'react'
import NotificationContext from '../Context'

const Notification = () => {
  const [notification, setNotification] = useContext(NotificationContext)

  const notificationStyle = {
    color: notification.color,
    background: 'lightgray',
    borderRadius: 10,
    padding: '0 20px 0 20px',
    border: `2px solid ${notification.color}`,
  }

  return (
    <div className="notification" style={notificationStyle}>
      <h3>{notification.message}</h3>
    </div>
  )
}

export default Notification
