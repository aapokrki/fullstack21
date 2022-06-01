import { useState } from 'react' 

const Blog = ({blog}) => {
  const [moreinfo, setMoreInfo] = useState(false)


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
        <div>Likes: {blog.likes} <button>like</button></div>
        <div>Added by: {blog.user.username}</div>
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