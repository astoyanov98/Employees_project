const checksImg = (image) => {
    return image !== 'http://httpstat.us/503' ? image : 'https://lorempixel.com/64/64/people/?30093'
}

export { checksImg }