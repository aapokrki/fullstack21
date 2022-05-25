const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likeSum = blogs.reduce((sum, order) =>  sum + order.likes,0)
  return likeSum
}

const favoriteBlog = (blogs) => {
  const mostLikedBlog = blogs.reduce((prev, current) => 
  (prev.likes > current.likes) ? prev : current )
  return mostLikedBlog;
}

const mostBlogs = (blogs) => {
  const authorWithMostBlogs = _.chain(_.map(blogs, 'author'))
    .countBy().toPairs().max(_.last).head().value();
  const amountOfBlogs = blogs.filter(u =>
     u.author === authorWithMostBlogs
  ).length;


  return {
    author: authorWithMostBlogs,
    blogs: amountOfBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}