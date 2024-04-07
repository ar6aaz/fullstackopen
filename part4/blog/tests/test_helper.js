const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Test blog 1",
    author: "Arbaaz",
    url: "https://a6z.co",
    likes: 3
  },
  {
    title: "Test blog 2",
    author: "Shaikh",
    url: "https://shk.co",
    likes: 5
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: "Test blog 1",
    author: "Arbaaz",
    url: "https://a6z.co",
    likes: 3 
})
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}