const sharp = require('sharp');
const path = require("path")
const fs = require("fs")


const resizeImages = async (file, SIZES) => {

    const images = {}

    const inputPath = file.path;
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    const uploadDir = path.join(__dirname, "..", "..", "public", "products");

    for (const [key, width] of Object.entries(SIZES)) {
        const filename = `${baseName}-${key}-${Date.now()}-${Math.round(Math.random() * 10000)}.jpeg`;
        const outputPath = path.join(uploadDir, filename);

        await sharp(inputPath)
            .resize(width)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(outputPath);

        images[key] = filename;
    }

    // Optional: delete original upload
    // fs.unlinkSync(inputPath);

    return images
}


const unlinkImages = (images) => {

    const uploadDir = path.join(__dirname, "..", "..", "public", "products")

    for (const [key, imageName] of Object.entries(images)) {

        if (!imageName) continue

        const imagePath = path.join(uploadDir, imageName)
        fs.unlinkSync(imagePath)
    }
}


module.exports = { resizeImages, unlinkImages }