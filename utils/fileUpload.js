// let cloudinary = require('../config/cloud');
// const axios = require('axios');
// const { Buffer } = require('buffer');

// exports.uploadImageToCloudinary = async (file, publicId, path) => {
//     try {
//         const result = await cloudinary.v2.uploader.upload(file, {
//             folder: path,
//             public_id: publicId,
//             overwrite: true,
//         },
//             function (error, result) {
//                 if (error) {
//                     return {
//                         success: false,
//                         statusCode: 500,
//                         message: "something went wrong !"
//                     }
//                 };
//             });
//         return {
//             success: true,
//             statusCode: 201,
//             message: "success",
//             url: result.url,
//             public_id: result.public_id
//         }
//     }
//     catch (err) {
//         return {
//             success: false,
//             statusCode: 500,
//             message: err.message
//         }
//     }
// }

// exports.urlToUnit8Array = async (url) => {
//     try {
//         const response = await axios.get(url, { responseType: 'arraybuffer' });
//         const uint8Array = new Uint8Array(response.data);
//         const buffer = Buffer.from(uint8Array);
//         //console.log(`buffer`, buffer)
//         return buffer;
//     }
//     catch (err) {
//         return {
//             success: false,
//             statusCode: 500,
//             message: err.message
//         }
//     }
// }


let AWS = require('aws-sdk');
const uuid = require("uuid").v4

require("dotenv").config();
const s3 = new AWS.S3({
    endpoint: process.env.BUCKET_ENDPOINT,
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_KEY,
    s3BucketEndpoint: true,
});



exports.uploadFileToS3 = async (folderName, file) => {
    try {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `public/${folderName}/${uuid()}-${file.originalname}`,
            Body: file.buffer
        };
        return await s3.upload(params).promise();
    } catch (err) {
        console.log(`err.message`, err.message);
        return err.message
    }
}

exports.uploadPDFToS3 = (folderName) => {
    // storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, `uploads/${folderName}`)
    //     },
    //     filename: function (req, file, cb) {
    //         cb(null, Date.now()+ Math.random() + '.pdf') //Appending .jpg
    //     }
    // })
    const storage = multer.memoryStorage()
    return multer({ storage: storage })
  }
