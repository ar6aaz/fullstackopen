const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 5,
          __v: 0
        }
    ]

    const blogs = [
        {
          _id: '5a422aa71b54a676234a17f8',
          title: 'Go To Statement Considered Not Harmful',
          author: 'Arbaaz',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra67.pdf',
          likes: 4,
          __v: 0
        },
        {
          _id: '5a422aa712fa676234a17f8',
          title: 'Copy of blog',
          author: 'Arbaaz',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra27.pdf',
          likes: 1,
          __v: 0
        },
        {
            _id: '5a422aa71b54a6s6234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstrsa',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 3,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676f24d17f8',
            title: 'Go To Statement Considered Average',
            author: 'Arbaaz',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra69.pdf',
            likes: 5,
            __v: 0
        }
    ]

    test('of empty list is zero', () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
      })

    test('of of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 13)
    })

    test('being max is returned as fav blog', () => {
        assert.deepStrictEqual(listHelper.favouriteBlog(blogs), blogs[3])
    })

    test('being max, author is returned', () => {
      assert.deepStrictEqual(listHelper.mostBlogs(blogs), { author: 'Arbaaz', blogs: 3 })
  })

  test('being max, author with all likes summed is returned', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), { author: 'Arbaaz', likes: 10 })
})
  })