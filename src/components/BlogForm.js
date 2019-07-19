import React from 'react'

const BlogForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addBlog}>
        <div>
          title:
            <input
            type="text"
            value={props.newTitle}
            name="Title"
            onChange={props.handleTitleChange}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={props.newAuthor}
            name="Author"
            onChange={props.handleAuthorChange}
          />
        </div>
        <div>
          Url:
            <input
            type="text"
            value={props.newUrl}
            name="Url"
            onChange={props.handleUrlChange}
          />
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm