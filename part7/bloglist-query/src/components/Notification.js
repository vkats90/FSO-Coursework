import { useContext } from 'react'
import NotificationContext from '../Context'

const Notification = () => {
	const [notification, setNotification] = useContext(NotificationContext)

	const notificationStyle = {
		color: notification.color,
		border: `2px solid ${notification.color}`,
	}

	return (
		<div
			style={notificationStyle}
			className="square xyz-in notification border-2 rounded-md px-3 py-2 m-2"
			xyz="fade narrow-25% wide-1"
		>
			<h3>{notification.message}</h3>
		</div>
	)
}

export default Notification
