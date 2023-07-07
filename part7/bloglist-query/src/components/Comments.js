import { useState } from 'react'

const Comments = ({ blog, addComment }) => {
  const [comment, setComment] = useState('')
  return (
    <div className="py-3">
      <h3 className="py-3">Comments:</h3>

      <ul className="p-3">
        {blog.comments.map((n) => (
          <li className="list-disc list-inside" key={n}>
            {n}
          </li>
        ))}
      </ul>
      <form onSubmit={addComment(comment)}>
        <input
          className="border rounded-md text-center"
          type="text"
          placeholder="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          className=" hover:text-purple-300  hover:border-purple-300 transition duration-150 font-medium border rounded-md  px-3 my-2"
          type="submit"
        >
          add
        </button>
      </form>
    </div>
  )
}

export default Comments
