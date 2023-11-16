// console.log(`process.env.CLOUD_NAME`, process.env.CLOUD_NAME)

// exports.uploadImage = async (image) => {
//     try {
//         const uploadedImage = await cloudinary.uploader.upload(image, { folder: "items" });
//         console.log(`uploadedImage`, uploadedImage)
//         return {
//             success: true,
//             code: 200,
//             url: uploadedImage.secure_url
//         }
//     } catch (err) {
//         console.log(`err.message`, err.message);
//         return {
//             success: false,
//             code: 500,
//             message: err.message
//         };
//     }
// }

let cloudinary = require('../config/cloud');
const axios = require('axios');
const { Buffer } = require('buffer');

exports.uploadImageToCloudinary = async (file, publicId, path) => {
    try {
        const result = await cloudinary.v2.uploader.upload(file, {
            folder: path,
            public_id: publicId,
            overwrite: true,
        },
            function (error, result) {
                if (error) {
                    return {
                        success: false,
                        statusCode: 500,
                        message: "something went wrong !"
                    }
                };
            });
        return {
            success: true,
            statusCode: 201,
            message: "success",
            url: result.url,
            public_id: result.public_id
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
}

exports.urlToUnit8Array = async (url) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const uint8Array = new Uint8Array(response.data);
        const buffer = Buffer.from(uint8Array);
        //console.log(`buffer`, buffer)
        return buffer;
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
}

