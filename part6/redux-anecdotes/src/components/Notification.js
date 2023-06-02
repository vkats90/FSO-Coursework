import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.message)
  const style = {
    border: '3px solid darkGreen',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    color: 'darkgreen',
  }
  return <>{notification && <div style={style}>{notification}</div>}</>
}

export default Notification
