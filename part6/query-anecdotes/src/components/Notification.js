import { useContext } from "react"
import notificationContext from "../notificationContext"

const Notification = () => {
	const [message, dispatch] = useContext(notificationContext)

	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
		marginBottom: 5,
	}

	if (!message) return <div />
	return <div style={style}>{message}</div>
}

export default Notification
