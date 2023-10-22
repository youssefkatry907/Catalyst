const cloudinary = require('cloudinary').v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// console.log(`process.env.CLOUD_NAME`, process.env.CLOUD_NAME)

exports.uploadImage = async (image) => {
    try {
        const uploadedImage = await cloudinary.uploader.upload(image, { folder: "items" });
        console.log(`uploadedImage`, uploadedImage)
        return {
            success: true,
            code: 200,
            url: uploadedImage.secure_url
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}

module.exports = cloudinary;