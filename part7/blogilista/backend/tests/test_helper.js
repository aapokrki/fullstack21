const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const initialBlogs = [
  {
    _id: "628d3b6123dc41ba63019e23",
    title: "Karhumetsästys 101",
    author: "Jorma Erä",
    url: "https://www.youtube.com/",
    likes: 1,
    user: "629684298216a36897de9db5", // Teppo
    __v: 0,
  },
  {
    _id: "628d3c3453cfef121a113ad7",
    title: "Kiljunvalmistuksen alkeet",
    author: "Marjatta Marjajuoma",
    url: "https://www.marjatanmehu.fi/",
    likes: 999,
    user: "629684298216a36897de9db5", // Teppo
    __v: 0,
  },
];

// Login with given user input. Return token
const testLogin = async (user) => {
  const res = await api.post("/api/login").send(user);

  return res.body.token;
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  const blogsJSON = blogs.map((blog) => blog.toJSON());
  return blogsJSON;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  testLogin,
};
