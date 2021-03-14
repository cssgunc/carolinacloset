const sharp = require('sharp');

const DEFAULT_IMAGE_WIDTH = process.env.DEFAULT_IMAGE_WIDTH || 1000,
    DEFAULT_IMAGE_HEIGHT = process.env.DEFAULT_IMAGE_HEIGHT || 1000;

exports.resizeImage = async function (image) {
    return await sharp(image)
        .resize(DEFAULT_IMAGE_WIDTH, DEFAULT_IMAGE_HEIGHT, {
            fit: 'contain'
        })
        .jpeg()
        .toBuffer();
}

exports.convertItemImagesToString = function (items) {
    for (let i = 0; i < items.length; i++) {
        item = items[i];
        if (item.image) {
            item.image = item.image.toString('base64');
        }
    }

    return items;
}


exports.resizeImageString = async function (imageString) {
    const uri = imageString.split(';base64,').pop()
    let imgBuffer = Buffer.from(uri, 'base64');
    imgBuffer = await sharp(imgBuffer).resize(DEFAULT_IMAGE_WIDTH, DEFAULT_IMAGE_HEIGHT).toBuffer()
    return imgBuffer.toString('base64')

}



