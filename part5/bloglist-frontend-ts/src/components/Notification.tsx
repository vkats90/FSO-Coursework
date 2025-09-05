import { useState, useEffect } from 'react'

type NoteType = {
  error?: string
  message?: string
}

const Notification = ({ note }: { note: NoteType }) => {
  const [color, setColor] = useState<'' | 'bg-red-200' | 'bg-green-200'>('')

  useEffect(() => {
    if (note.message) {
      setColor('bg-green-200')
      setTimeout(() => setColor(''), 5000)
    } else if (note.error) {
      setColor('bg-red-200')
      setTimeout(() => setColor(''), 5000)
    }
  }, [note])

  if (color)
    return (
      <div className="w-full fixed top-0 h-20 z-30">
        <div
          className={` ${color} px-4 py-2 my-4 w-[400px] max-w-[90vw] text-center rounded-lg mx-auto shadow-md`}
        >
          {note.message ? note.message : note.error}
        </div>
      </div>
    )
}

export default Notification
