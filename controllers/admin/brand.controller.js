let brand = require("../../modules/Brand/brand.repo");
const s3StorageHelper = require('../../utils/fileUpload');

exports.create = async (req, res) => {
    try {
        let result = await brand.createBrand(req.body);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}

exports.list = async (req, res) => {
    try {
        let result = await brand.listBrands(req.query);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}

exports.uploadImage = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({
            success: false,
            code: 400,
            message: "Image is required"
        });
        const image = await s3StorageHelper.uploadFileToS3('brands', file);
        const uploadedImage = await brand.updateImage(req.query._id, image);
        return res.status(uploadedImage.code).json({
            success: uploadedImage.success,
            code: uploadedImage.code,
            image: uploadedImage.url
        });
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}

exports.delete = async (req, res) => {
    try {
        let result = await brand.deleteBrand(req.query._id)
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }

}

exports.update = async (req, res) => {
    try {
        let result = await brand.updateBrand(req.query._id, req.body);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }

}
