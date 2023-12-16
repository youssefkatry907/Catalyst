let item = require('../../modules/Item/item.repo');
const s3StorageHelper = require('../../utils/fileUpload');

exports.create = async (req, res) => {
    try {
        const result = await item.createItem(req.body);
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

exports.upload = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({
            success: false,
            code: 400,
            message: "Image is required"
        });
        const image = await s3StorageHelper.uploadFileToS3('items', file);
        let uploadedImage = await item.uploadImage(req.query._id, image);
        return res.status(uploadedImage.code).json({
            success: uploadedImage.success,
            code: uploadedImage.code,
            item: uploadedImage.updatedItem
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

exports.search = async (req, res) => {
    try {
        const result = await item.searchItem(req.query);
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

exports.mostSearched = async (req, res) => {
    try {
        const result = await item.mostSearchedItems();
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