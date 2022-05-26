const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blog is about Karhunmetsästys', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  
  expect(contents).toContain(
    'Karhumetsästys 101')

})

afterAll(() => {
  mongoose.connection.close()
})