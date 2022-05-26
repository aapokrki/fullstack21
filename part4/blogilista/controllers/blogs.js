const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {info, error} = require('../utils/logger')

//ALL BLOGS
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
//SINGLE BLOG
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog)
  }else{
    response.status(404).end()
  }
})
//ADD BLOG
blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})
//DELETE BLOG
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

  } catch (error) {
    next(error)
  }
})

//MODIFY BLOG LIKES
blogsRouter.put('/:id', async (request, response, next) => {

  const blog = request.body
  console.log(blog)

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    updatedBlog
    ? response.status(200).json(updatedBlog)
    : response.status(404).end()
    
  } catch (error) {
    next(error)
  }
})


module.exports = blogsRouter