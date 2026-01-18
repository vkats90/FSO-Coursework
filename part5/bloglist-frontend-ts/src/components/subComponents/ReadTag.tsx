import { useState, useEffect } from 'react'
import type { BlogType, UserType } from '../../../types'
import { useAppData } from '../../context/context'
import readingService from '../../../services/readingList'

const ReadTag = ({ blog }: { blog: BlogType }) => {
  const [read, setRead] = useState(false)
  const { user, setNote } = useAppData()

  useEffect(() => {
    ;(async () => {
      const reading = await readingService.getReading(user as UserType, blog)
      console.log(reading)
      setRead(reading)
    })()
  }, [])

  const handleUpdate = async () => {
    setRead((prev) => !prev)
    await readingService.addReading(blog, user as UserType, !read)

    setNote({ message: 'Successfully updated' })
  }

  return (
    <div className="ml-2 w-fit cursor-pointer" onClick={handleUpdate}>
      {' '}
      {read ? (
        <div className="text-blue-800 font-medium text-lg border border-blue-800 rounded px-1 ">
          read
        </div>
      ) : (
        <div className="text-red-800 font-medium text-lg border border-red-800 rounded px-1 ">
          not read
        </div>
      )}
    </div>
  )
}

export default ReadTag
