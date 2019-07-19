import React, { useState, useEffect } from 'react'
import blogsService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
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

  const notify = ({message, type}) => {
    setMessage({ message, type })
    setTimeout(() => setMessage([null]), 5000)
  }

  const addBlog = (event) => {
    event.preventDefault()

    try{
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }
      blogsService
        .create(blogObject)
          .then(returnedObject => {
            returnedObject = {
              ...returnedObject,
              user: {
                name: user.name
              }
            }       
            setBlogs(blogs.concat(returnedObject))
            setTitle('')
            setAuthor('')
            setUrl('')
            notify({
                message: `a new blog ${returnedObject.title} by ${returnedObject.author} added`, 
                type:'success'
              })
          })  
    } catch (exception) {
    }
  }

  const updateLikes = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    
    try{
      const changedBlog = {
        ...blog,
        likes: blog.likes+1,
      }

      const returnedObject = await blogsService.update(blog.id, changedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedObject))
      notify({
        message: `You liked ${blog.title} by ${blog.author}`, 
        type:'success'
      })
    }catch (exception) {
      console.log('exception :', exception);
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
  
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify({message: `wrong username or password`, type:'error'})
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message.message} type={message.type}/>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
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
      <div>
        <h2>blogs</h2>
        <Notification message={message.message} type={message.type}/>
        <p>
          {user.name} logged in
          <button onClick={logOut}>log out</button>
        </p>

        <Togglable buttonLabel="new blog">
          <BlogForm 
          addBlog={addBlog}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
          handleTitleChange={(event) => setTitle(event.target.value)}
          handleAuthorChange={(event) => setAuthor(event.target.value)}
          handleUrlChange={(event) => setUrl(event.target.value)}
          />
        </Togglable>

        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={() => updateLikes(blog.id)}/>
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

export default App;
