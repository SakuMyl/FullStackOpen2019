const countBy = require('lodash/countBy')
const groupBy = require('lodash/groupBy')
const reduce = require('lodash/reduce')
const forEach = require('lodash/forEach')

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    const adder = (a, b) => {
        return a + b
    }
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce(adder, 0)
}

const favoriteBlog = blogs => {
    const comparator = (blog1, blog2) => {
        return blog1.likes >= blog2.likes ? blog1 : blog2
    }

    if(blogs.length === 0) return undefined

    return blogs.reduce(comparator, blogs[0])
}

const mostBlogs = blogs => {

    if(blogs.length === 0) return undefined

    const counts = countBy(blogs, 'author')

    const comparator = (author1, author2) => {
        return counts[author1] >= counts[author2] ? author1 : author2
    }
    const author = reduce(Object.keys(counts), comparator)

    return {
        author,
        blogs: counts[author]
    }
}

const mostLikes = blogs => {

    if(blogs.length === 0) return undefined

    const grouped = groupBy(blogs, 'author')

    const likes = {}

    forEach(Object.keys(grouped), author => likes[author] = totalLikes(grouped[author]))

    const comparator = (author1, author2) => {
        return likes[author1] >= likes[author2] ? author1 : author2
    }
    const author = reduce(Object.keys(likes), comparator)

    return {
        author,
        likes: likes[author]
    }

}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}