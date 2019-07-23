import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog, username }) =>  {
  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const areYouSure = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`))
    {removeBlog()}
  }

  const showRemoveButton = username === blog.user.username
    ? <button onClick={areYouSure}>remove</button>
    : null

  const showBlogInfo = () => {

    if (visibility) {
      return (
        <div className='togglableContent'>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes
            <button onClick={updateLikes}>like</button>
          </div>
          <div>added by {blog.user.name} </div>
          {showRemoveButton}
        </div>
      )
    }
    return null
  }

  return (
    <div style={blogStyle} className='blog'>
      <div onClick={() => setVisibility(!visibility)} className='header'>
        {blog.title} {blog.author}
      </div>
      {showBlogInfo()}
    </div>
  )
}

export default Blog