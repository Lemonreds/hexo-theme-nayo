
hexo.extend.helper.register('postsCount', function (posts, year) {
    let count = 0
    posts.each(post => {
        if (year === post.date.year()) {
            count++
        }
    })
    return count
})