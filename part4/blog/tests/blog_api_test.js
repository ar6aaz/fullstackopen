const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog has unique property called', async () => {
  const resp = await api
    .get('/api/blogs')
    .expect(200)
  assert(resp.body[0].id.length > 1)
})

test('can add a new blog to the database', async () => {

  const allBlogs = await api
    .get('/api/blogs')

  const initialLength = allBlogs.body.length

  const newBlog = {
    title: "new Test blog",
    author: "new author",
    url: "https://a6z.commm",
    likes: 2
  }

  const newBlogRepsonse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const resp = await api
    .get('/api/blogs')
  assert(resp.body.length, initialLength + 1)
  assert(newBlogRepsonse.body.title, "new Test blog")
})

test('likes default to 0 if missing', async () => {
  const newBlog = {
    title: "new Test blog2",
    author: "new author2",
    url: "https://a6z.comm2m",
  }

  const newBlogRepsonse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
  assert(newBlogRepsonse.body.likes == 0)
})

test('title is a required property', async () => {
  const newBlog = {
    author: "new author2",
    url: "https://a6z.comm2m",
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('url is a required property', async () => {
  const newBlog = {
    title: "new title2",
    author: "new auhtor 2",
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})