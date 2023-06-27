import { useSelector } from 'react-redux'

const Notification = () => {
  let state = useSelector((state) => state.notification)

  const notificationStyle = {
    color: state.color,
    background: 'lightgray',
    borderRadius: 10,
    padding: '0 20px 0 20px',
    border: `2px solid ${state.color}`,
  }

  if (state.message)
    return (
      <div className="notification" style={notificationStyle}>
        <h3>{state.message}</h3>
      </div>
    )
}

export default Notification
