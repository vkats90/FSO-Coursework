import { useState } from 'react'

const Comments = ({ blog, addComment }) => {
  const [comment, setComment] = useState('')
  return (
    <div>
      <h3>comments:</h3>
      <form onSubmit={addComment(comment)}>
        <input
          type="text"
          placeholder="write your comment here"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
