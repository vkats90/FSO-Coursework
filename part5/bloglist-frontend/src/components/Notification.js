const Notification = ({ message, color }) => {
  const notificationStyle = {
    color: color,
    background: 'lightgray',
    borderRadius: 10,
    padding: '0 20px 0 20px',
    border: `2px solid ${color}`,
  }

  return (
    <div className="notification" style={notificationStyle}>
      <h3>{message}</h3>
    </div>
  )
}

export default Notification
