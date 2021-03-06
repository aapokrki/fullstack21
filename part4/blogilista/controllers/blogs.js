const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {info, error} = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

//ALL BLOGS
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

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
blogsRouter.post('/',userExtractor, async (request, response, next) => {
  const body = request.body
  const user = request.user
  try {
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user

    })
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)

  } catch (error) {
    next(error)
  }
})


//DELETE BLOG
blogsRouter.delete('/:id',userExtractor, async (request, response, next) => {

  const token = request.token
  const blogId = request.params.id
  const user = request.user

  try {
    const blog = await Blog.findById(blogId)

    if(!blog){
      return response.status(400).json({
        error: `this blog does not exist in api/blogs`
      })
    }

    if(blog.user.toString() === user.id.toString()){

      // REMOVED BLOG FROM BLOGS
      await Blog.findByIdAndDelete(blogId)

      // REMOVES BLOG FROM USER
      const updatedUser = await User.findByIdAndUpdate(user.id, {
        $pull: {blogs: {id: blogId} } }, {
          upsert: false,
          multi: true,
          new: true
        })
      await updatedUser.save()
      response.status(204).end()

    }else{
      return response.status(400).json({
        error: `this user (${user.username}) cannot delete this blog`
      })
    }

  } catch (error) {
    next(error)
  }
})

//MODIFY BLOG LIKES
blogsRouter.put('/:id', async (request, response, next) => {

  const blog = request.body

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