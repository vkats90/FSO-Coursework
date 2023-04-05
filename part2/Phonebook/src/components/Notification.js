const Notification = ({ message, color }) => {
  const notificationStyle = {
    padding: 10,
    color: color,
    background: "lightgrey",
    border: `4px solid ${color}`,
    borderRadius: "10px",
    fontSize: 20,
  };
  if (message == null) return null;
  return (
    <p className="notification" style={notificationStyle}>
      {message}
    </p>
  );
};
export default Notification;
