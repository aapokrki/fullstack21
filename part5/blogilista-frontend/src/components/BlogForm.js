
const BlogForm = ({
  addBlog,
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl,
  setNewBlogTitle,
  setNewBlogAuthor,
  setNewBlogUrl }) => {
  return (<form onSubmit={addBlog}>

    <div>title:
      <input
        value={newBlogTitle}
        onChange={({ target }) => setNewBlogTitle(target.value)} />
    </div>

    <div>author:
      <input
        value={newBlogAuthor}
        onChange={({ target }) => setNewBlogAuthor(target.value)} />
    </div>

    <div>url:
      <input
        value={newBlogUrl}
        onChange={({ target }) => setNewBlogUrl(target.value)} />
    </div>

    <button type="submit">add blog</button>
  </form>)
}
export default BlogForm