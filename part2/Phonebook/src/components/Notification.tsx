import { Message } from '../../types'

const Notification = ({ notification }: { notification: Message }) => {
  if (!notification.message) return null

  return (
    <div
      style={{
        width: '100%',
        padding: '10px',
        position: 'absolute',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '70%',
          border: `3px solid ${notification.type == 'success' ? 'green' : 'red'}`,
          borderRadius: '5px',
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          margin: 'auto',
          color: `${notification.type == 'success' ? 'green' : 'red'}`,
        }}
      >
        {notification.message}
      </div>
    </div>
  )
}

export default Notification
