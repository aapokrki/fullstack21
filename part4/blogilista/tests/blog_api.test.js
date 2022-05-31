const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const { info } = require('../utils/logger')
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

let authToken = {};

// Initialize users and login as Teppo, setting the authToken for tests
beforeAll(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('salasana', 10)
  const matti = new User({_id: "62966f9f4f30d95f3be4f629", username: 'Matti', name: "Matti", passwordHash })
  const teppo = new User({_id: "629684298216a36897de9db5", username: 'Teppo', name: "Teppo", passwordHash })

  await matti.save()
  await teppo.save()

  return(authToken = await helper.testLogin({username: 'Teppo', password: "salasana"}))
})

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    // INITIALIZE BLOGS
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
  describe('addition of a blog', () => {
    
    test('shows in datebase when blog is valid', async () => {
      const newBlog = {
        _id: "5a422a851b54a676234d17f7",
        title: "How to add a blog from a test",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: "629684298216a36897de9db5",
        __v: 0
      }
    
      //const authToken = await helper.testLogin(({username: "Teppo", password: "salasana"}))
      
      await api
        .post('/api/blogs')
        .set("Authorization", `bearer ${authToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      const titles = blogsAtEnd.map(b => b.title)
    
      expect(titles).toContainEqual('How to add a blog from a test')
    })

    test('with undefined likes, defaults likes to 0', async () => {
      const newBlog = {
        _id: "5a422a851b54a676234d17f7",
        title: "Blog with likes as undefined",
        author: "Joojoo Jorma",
        url: "https://reactpatterns.com/",
        user: "629684298216a36897de9db5",
        __v: 0
      }
    
      await api
        .post('/api/blogs')
        .set("Authorization", `bearer ${authToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const blogsAtEnd = await helper.blogsInDb()
      
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      const addedBlogInDb = blogsAtEnd.find(b => b.title === newBlog.title)
    
      expect(addedBlogInDb.likes).toBeDefined()
      expect(addedBlogInDb.likes).toEqual(0)
    })
    
    test('without title gives status 400', async () => {
      const noTitleBlog = {
        _id: "5a422a851b54a676234d17f7",
        author: "No title",
        url: "https://reactpatterns.com/",
        user: "629684298216a36897de9db5",
        likes: 10,
        __v: 0
      }
      await api
        .post('/api/blogs')
        .set("Authorization", `bearer ${authToken}`)
        .send(noTitleBlog)
        .expect(400)
    
    })
    test('without url gives status 400', async () => {
      const noUrlBlog = {
        _id: "5a422a851b54a676234d17f7",
        title: "wtf",
        author: "No URL",
        user: "629684298216a36897de9db5",
        likes: 10,
        __v: 0
      }
        
      await api
      .post('/api/blogs')
      .set("Authorization", `bearer ${authToken}`)
      .send(noUrlBlog)
      .expect(400)
    })
    test('without autherization token returns 401', async () => {

      const newBlog = {
        _id: "5a422a851b54a676234d17f7",
        title: "How to add a blog from a test",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: "629684298216a36897de9db5",
        __v: 0
      }
          
      await api
        .post('/api/blogs')
        .set("Authorization", 'bearer ')
        .send(newBlog)
        .expect(401)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `bearer ${authToken}`)
        .expect(204)
    
      const blogsAtEnd = await helper.blogsInDb()
    
      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1)
    
      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).not.toContain(blogToDelete.title)
    }) 
  })

  describe('changing data of blog', () => {
    test('returns code 200 if idvalid (add 5 likes)', async () => {
  
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

    
      const addFiveLikes = {
        likes: blogToUpdate.likes + 5
      }
    
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(addFiveLikes)
        .expect(200)
    
      const blogsAtEnd = await helper.blogsInDb()
    
      expect(blogsAtEnd[0].likes).toEqual(blogToUpdate.likes + 5)
    })

    test('returns code 404 if id not valid. no changes to db', async () => {
  
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
    
      const addFiveLikes = {
        likes: blogToUpdate.likes + 5
      }
      await api
        .put(`/api/blogs/09623562asd3`)
        .send(addFiveLikes)
        .expect(404)
    
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toEqual(blogsAtStart)

    })
  })
})

// USERS
describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'Matti', name: "Matti", passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Matti',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
