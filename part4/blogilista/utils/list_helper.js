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
const mostLikes = (blogs) => {

  // Contains array of all authors and their combined amount of likes
  const authorsLikes = _.chain(blogs)
  .groupBy(e => e.author)
  .map((group) =>{
    return _.reduce(group, (current, next) => {
      return {
        author: current.author,
        likes: current.likes + next.likes
      };
    });
  }).value();

  // Author with the most likes
  const authorWithMostLikes = authorsLikes.reduce((prev, current) => 
  (prev.likes > current.likes) ? prev : current )

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}