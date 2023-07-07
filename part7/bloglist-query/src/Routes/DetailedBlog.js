import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useParams, useNavigate } from 'react-router-dom'
import Context from '../Context'
import Comments from '../components/Comments'

const DetailedBlog = () => {
  const [message, setMessage, user] = useContext(Context)

  const navigate = useNavigate()

  const id = useParams().id
  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation(blogService.updateBlog, {
    onSuccess: (res) => {
      const response = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        response
          .map((x) => {
            if (x.id === blog.id) x = res
            return x
          })
          .sort((a, b) => b.likes - a.likes)
      )
    },
    onError: (error) => {
      setMessage(error.message, 'red')
      return console.log(error.message)
    },
  })

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: (res) => {
      console.log(res)
      const response = queryClient.getQueryData('blogs')

      queryClient.setQueryData(
        'blogs',
        response.filter((x) => x.id !== res.id)
      )
      setMessage(`deleted blog ${blog.title}`, 'green')
    },
    onError: (error) => {
      setMessage(error.message, 'red')
      return console.log(error.message)
    },
  })

  const addLike = () => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const addComment = (comment) => (event) => {
    event.preventDefault()
    updateBlogMutation.mutate({ ...blog, comments: blog.comments.concat(comment) })
  }

  const handleDelete = (blog) => {
    if (window.confirm('Are you sure you want to delete this blog?'))
      deleteBlogMutation.mutate(blog)
    navigate('/')
  }

  const blogs = useQuery(
    'blogs',
    () => blogService.getAll().then((res) => res.sort((a, b) => b.likes - a.likes)),
    {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  )
  console.log(blogs)

  if (blogs.isLoading) return <p>Loading...</p>

  const blog = blogs.data.find((n) => n.id === id)
  console.log(blog)

  return (
    <div className="relative blog_url_likes w-max bg-gradient-to-b from-white to-purple-50 border-2 border-purple-200 m-8 p-5 rounded-lg">
      <h3 className="text-2xl py-5 font-bold text-purple-800">{blog.title}</h3>
      <a className="hover:text-purple-300" href={blog.url}>
        {blog.url}
      </a>
      <p className="py-3">added by: {blog.user.name}</p>
      <Comments blog={blog} addComment={addComment} />
      <form></form>
      {blog.user.username === user.username ? (
        <button
          className="deleteButton absolute flex left-2 bottom-2 hover:text-red-600  hover:border-red-600 transition duration-150 font-medium border rounded-md  px-3 my-1 py-1"
          onClick={() => handleDelete(blog)}
        >
          delete
        </button>
      ) : (
        ''
      )}
      <br />
      <div className="absolute flex right-1 bottom-1">
        <span className="likes transition duration-150 font-medium border rounded-md p-1 px-2 my-2 ">
          {blog.likes}{' '}
        </span>
        <button
          onClick={addLike}
          className="likeButton flex hover:text-purple-300  hover:border-purple-300 transition duration-150 font-medium border rounded-md  px-3 my-2 pt-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 pt-1 pr-1}"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>
          like
        </button>{' '}
      </div>
    </div>
  )
}

export default DetailedBlog
