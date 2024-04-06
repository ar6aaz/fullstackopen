const dummy = (blogs) => {
    return 1
}
 
const totalLikes = (blogs) => {
    return blogs.length == 0 
    ? 0 
    : blogs.reduce((acc, blog) => acc + blog.likes, 0);
}

const favouriteBlog = (blogs) => {
    const maxIndex = blogs.reduce((maxIndex, blog, currentIndex, arr) => {
        return blog.likes > arr[maxIndex].likes ? currentIndex : maxIndex;
    }, 0);
    return blogs[maxIndex];
}

const mostBlogs = (blogs) => {
    const authorCounts = {};
    blogs.forEach(blog => {
        const author = blog.author;
        authorCounts[author] = (authorCounts[author] || 0) + 1;
    });

    let topAuthor;
    let maxBlogs = 0;
    for (const author in authorCounts) {
        if (authorCounts[author] > maxBlogs) {
            topAuthor = author;
            maxBlogs = authorCounts[author];
        }
    }
    return {
        author: topAuthor,
        blogs: maxBlogs
    };
}

const mostLikes = (blogs) => {
    const authorLikes = {};
    blogs.forEach(blog => {
        const author = blog.author;
        authorLikes[author] = (authorLikes[author] || 0) + blog.likes;
    });
    
    let topAuthor;
    let maxLikes = 0;
    for (const author in authorLikes) {
        if (authorLikes[author] > maxLikes) {
            topAuthor = author;
            maxLikes = authorLikes[author];
        }
    }

    return {
        author: topAuthor,
        likes: maxLikes
    };
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}