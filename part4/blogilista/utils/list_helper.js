
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}