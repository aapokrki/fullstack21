const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const { info } = require('../utils/logger')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs are returned (all)', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)

})

test('blogs identify with id', async () => {
  const response = await api.get('/api/blogs')
  const idArray = response.body.map(blog => blog.id)

  for(id of idArray){
    expect(id).toBeDefined()
  }
})

test('blog is added to db', async () => {
  const newBlog = {
    _id: "5a422a851b54a676234d17f7",
    title: "How to add a blog from a test",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const titles = blogsAtEnd.map(b => b.title)

  expect(titles).toContainEqual('How to add a blog from a test')
})

test('give undefined likes a value of 0', async () => {
  const newBlog = {
    _id: "5a422a851b54a676234d17f7",
    title: "Blog with likes as undefined",
    author: "Joojoo Jorma",
    url: "https://reactpatterns.com/",
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  //console.log(blogsAtEnd)
  
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const addedBlogInDb = blogsAtEnd.find(b => b.title === newBlog.title)

  expect(addedBlogInDb.likes).toBeDefined()
  expect(addedBlogInDb.likes).toEqual(0)
})

test('blog without title or url gives status 400', async () => {
  const noTitleBlog = {
    _id: "5a422a851b54a676234d17f7",
    author: "No title",
    url: "https://reactpatterns.com/",
    likes: 10,
    __v: 0
  }

  const noUrlBlog = {
    _id: "5a422a851b54a676234d17f7",
    title: "wtf",
    author: "No URL",
    likes: 10,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)

    
  await api
  .post('/api/blogs')
  .send(noUrlBlog)
  .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})