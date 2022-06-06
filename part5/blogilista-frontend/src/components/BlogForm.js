import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')

  }

  return (<form onSubmit={addBlog}>

    <div>title:
      <input
        value={newBlogTitle}
        onChange={({ target }) => setNewBlogTitle(target.value)}
        id='title-input'
      />

    </div>

    <div>author:
      <input
        value={newBlogAuthor}
        onChange={({ target }) => setNewBlogAuthor(target.value)}
        id='author-input'
      />
    </div>

    <div>url:
      <input
        value={newBlogUrl}
        onChange={({ target }) => setNewBlogUrl(target.value)}
        id='url-input'
      />
    </div>

    <button type="submit">add blog</button>
  </form>)
}
export default BlogForm