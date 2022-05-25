const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likeSum = blogs.reduce((sum, order) =>  sum + order.likes,0)
  return likeSum
}

module.exports = {
  dummy,
  totalLikes
}