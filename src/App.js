import React, { useState, useEffect } from 'react'
import blogsService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'


const App = () => {
  // eslint-disable-next-line
  const noReset = ({ reset, ...rest }) => rest
  const username  = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState([null])


  useEffect(() => {
    const fetchData = async () => {
      const data = await blogsService.getAll()
      setBlogs(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const notify = ({ message, type }) => {
    setMessage({ message, type })
    setTimeout(() => setMessage([null]), 5000)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try{
      const blogObject = {
        title: title.value,
        author: author.value,
        url: url.value
      }
      let returnedObject = await blogsService.create(blogObject)

      // adding user info to show blog creator and remove button without refresh
      returnedObject = {
        ...returnedObject,
        user: {
          id: returnedObject.user,
          name: user.name,
          username: user.username
        }
      }
      setBlogs(blogs.concat(returnedObject))
      title.reset()
      author.reset()
      url.reset()
      notify({
        message: `a new blog ${returnedObject.title} by ${returnedObject.author} added`,
        type:'success'
      })
    } catch (exception) {
      console.log('exception :', exception)
    }
  }

  const removeBlog = async (id) => {

    try {
      const findblog = blogs.find(blog => blog.id = id)
      await blogsService.deleteBlog(id)

      setBlogs(blogs.filter(blog => blog.id !== findblog.id))


      notify({
        message: `${findblog.title} by ${findblog.author} was deleted`,
        type:'success'
      })
    } catch (exception) {
      console.log('exception :', exception)
    }
  }

  const updateLikes = async (id) => {

    try{
      const blog = blogs.find(blog => blog.id === id)
      const changedBlog = {
        ...blog,
        likes: blog.likes+1,
      }

      let returnedObject = await blogsService.update(id, changedBlog)

      // adding user info to show blog creator and remove button without refresh
      returnedObject = {
        ...returnedObject,
        user: blog.user
      }

      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedObject))
      notify({
        message: `You liked ${blog.title} by ${blog.author}`,
        type:'success'
      })
    }catch (exception) {
      console.log('exception :', exception)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogsService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      notify({ message: 'wrong username or password', type:'error' })
    }
  }

  const loginForm = () => {
    return (
      <div className='loginForm'>
        <h2>Log in to application</h2>
        <Notification message={message.message} type={message.type}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input {...noReset(username)} />
          </div>
          <div>
            password
            <input {...noReset(password)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogForm = () => {
    return (
      <div className='blogs'>
        <h2>blogs</h2>
        <Notification message={message.message} type={message.type}/>
        <p>
          {user.name} logged in
          <button onClick={logOut}>log out</button>
        </p>

        <Togglable buttonLabel="new blog">
          <BlogForm
            addBlog={addBlog}
            title={noReset(title)}
            author={noReset(author)}
            url={noReset(url)}
          />
        </Togglable>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={() => updateLikes(blog.id)}
            removeBlog={() => removeBlog(blog.id)}
            username={user.username}
          />
        )}
      </div>
    )
  }

  return (
    user === null
      ? loginForm()
      : blogForm()
  )

}

export default App
