import React from 'react'
import PropTypes from 'prop-types' // teht 5.11

const BlogForm = ({
  addBlog,
  title,
  author,
  url,
}) => {

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input {...title}/>
        </div>
        <div>
          author:
          <input {...author}/>
        </div>
        <div>
          Url:
          <input {...url}/>
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
}
export default BlogForm