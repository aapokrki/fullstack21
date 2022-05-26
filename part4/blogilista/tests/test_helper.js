const Blog = require('../models/blog');

const initialBlogs = [
  {
    _id: "628d3b6123dc41ba63019e23",
    title: "Karhumetsästys 101",
    author: "Jorma Erä",
    url: "https://www.youtube.com/",
    likes: 1,
    __v: 0
  },
  {
    _id: "628d3c3453cfef121a113ad7",
    title: "Kiljunvalmistuksen alkeet",
    author: "Marjatta Marjajuoma",
    url: "https://www.marjatanmehu.fi/",
    likes: 999,
    __v: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  const blogsJSON = blogs.map(blog => blog.toJSON())
  return blogsJSON
}

module.exports = {
  initialBlogs,
  blogsInDb
}