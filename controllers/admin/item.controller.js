let item = require('../../modules/Item/item.repo');
const s3StorageHelper = require('../../utils/fileUpload');

exports.create = async (req, res) => {
    try {
        const result = await item.createAdminItem(req.body);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}

exports.list = async (req, res) => {
    try {
        const result = await item.listItems(req.query);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}

exports.get = async (req, res) => {
    try {
        const result = await item.getItem(req.query);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}

exports.update = async (req, res) => {
    try {
        const result = await item.updateItem(req.query._id, req.body);
        return res.status(result.code).json(result);
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
        const result = await item.deleteItem(req.query._id);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}


exports.updateImage = async (req, res) => {
    try {
        const file = req.file
        if (!file) return res.status(400).json({
            success: false,
            code: 400,
            message: "Image is required"
        });
        const image = await s3StorageHelper.uploadFileToS3('items', file);
        const updatedImage = await item.updateImage(req.query._id, image, req.query.index);
        return res.status(updatedImage.code).json({
            success: updatedImage.success,
            code: updatedImage.code,
            images: updatedImage.updatedItem.listOfImages,
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