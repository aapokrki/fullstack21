import { useState } from 'react' 

const Blog = ({blog, addLike}) => {
  const [moreinfo, setMoreInfo] = useState(false)

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

  if(moreinfo){
    return(
      <div style={blogStyle}>
        {blog.title} by {blog.author}
        <button onClick={() => setMoreInfo(false)}>hide</button>
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes} <button onClick={addLike}>like</button></div>
        <div>Added by: {blog.user ? blog.user.username : "unknown"}</div>
      </div> 
      ) 
  }


  return(
  <div style={blogStyle}>
    {blog.title} by {blog.author}
    <button onClick={() => setMoreInfo(true)}>view</button>

  </div> 
  ) 
}

export default Blog