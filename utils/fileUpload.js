let cloudinary = require('../config/cloud');
const axios = require('axios');
const { Buffer } = require('buffer');

exports.uploadImageToCloudinary = async (filePath, publicId, folderName) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath, {
            folder: folderName,
            public_id: publicId,
            overwrite: true,
        },
            function (error, result) {
                if (error) {
                    return {
                        success: false,
                        statusCode: 500,
                        message: error
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
};

exports.urlToUnit8Array = async (url) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const uint8Array = new Uint8Array(response.data);
        const buffer = Buffer.from(uint8Array);
        return buffer;
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};
