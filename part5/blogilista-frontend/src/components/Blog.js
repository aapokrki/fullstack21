import { useEffect, useState } from 'react' 

const Blog = ({blog, username, addLike, deleteBlog}) => {
  const [moreinfo, setMoreInfo] = useState(false)
  const [createdByCurrentUser, setCreatedByCurrentUser] = useState(false)

  // const addLike = async (event) => {
  //   event.preventDefault()
  //   console.log(blog)
  //   const changedBlog = {...blog, likes: blog.likes + 1}
  //   console.log(changedBlog)

  //   await blogService.update(blog.id, changedBlog)
    
  // }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  

  // Hides the delete button the same way togglable does. May be unsafe, since a user
  // can access the button by just editin the html in the browser.
  // They cannot edit it without the correct token so all good
  const showDeleteButton = { display: createdByCurrentUser ? '' : 'none' }

  const handleOnClick = () => {
    setMoreInfo(!moreinfo)

    // Check if correct user when view button is pressed.
    // Is more efficient than checking all blogs at the start
    if(username === blog.user.username){
      setCreatedByCurrentUser(true)
    }
  }

  if(moreinfo){
    return(
      <div style={blogStyle}>
        {blog.title} by {blog.author}
        <button onClick={() => handleOnClick()}>hide</button>
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes} <button onClick={addLike}>like</button></div>
        <div>Added by: {blog.user ? blog.user.username : "unknown"}</div>
        <button style={showDeleteButton} onClick={() => deleteBlog()}>delete blog</button>
      </div> 
      ) 
  }


  return(
  <div style={blogStyle}>
    {blog.title} by {blog.author}
    <button onClick={() => handleOnClick()}>view</button>

  </div> 
  ) 
}

export default Blog