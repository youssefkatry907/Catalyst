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
            ContentType: file.mimetype,
            Body: file.buffer
        };
        return await s3.upload(params).promise();
    } catch (err) {
        console.log(`err.message`, err.message);
        return err.message
    }
}
