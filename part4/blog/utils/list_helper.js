const dummy = (blogs) => {
    return 1
}
 
const totalLikes = (blogs) => {
    return blogs.length == 0 
    ? 0 
    : blogs.reduce((acc, blog) => acc + blog.likes, 0);
}

const favouriteBlog = (blogs) => {
    // const maxValue = Math.max(blogs)
    // const maxIndex = blogs.indexOf(maxValue)
    // console.log("maxIndex: ", maxIndex)
    const maxIndex = blogs.reduce((maxIndex, blog, currentIndex, arr) => {
        return blog.likes > arr[maxIndex].likes ? currentIndex : maxIndex;
    }, 0);
    return maxIndex;
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}