function getThumbnailFromContent(content) {
    const defaultImage = '/images/image-do-not-exist.png'

    if (!content) return defaultImage;

    let a = content.indexOf('<img');
    let b = content.indexOf('>', a) + 1;
    if (!a || !b || a < 0 || b < 0) return defaultImage;

    let img = content.slice(a, b);
    a = img.indexOf('src=');
    b = img.indexOf(' ', a) + 1;
    if (!a || !b || a < 0 || b < 0) return defaultImage;

    img = img.slice(a, b).slice(5, img.length - 2)

    return img || defaultImage;
}
module.exports = { getThumbnailFromContent }