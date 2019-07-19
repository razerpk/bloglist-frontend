import React, { useState } from 'react'

const Blog = ({ blog, updateLikes }) =>  {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visibility, setVisibility] = useState(false)

  const showBlogInfo = () => {
    if (visibility){
      return (
        <div>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes 
            <button onClick={updateLikes}>like</button>
          </div>
          <div>added by {blog.user.name} </div>
        </div>
      )
    }
    return null
  }

  return (
    <div style={blogStyle}> 
      <div onClick={() => setVisibility(!visibility)}>
        {blog.title} {blog.author}
      </div>
      {showBlogInfo()}
  </div>
  )
}

export default Blog