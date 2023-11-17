let item = require('../../modules/Item/item.repo');

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
        const result = await item.listItems();
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

exports.uploadImage = async (req, res) => {
    try {
        const image = req.file
        if (!image) return res.status(400).json({
            success: false,
            code: 400,
            message: "Image is required"
        });
        const uploadedImage = await item.uploadMultipleImages(req.query._id, image.path);
        return res.status(uploadedImage.code).json({
            success: uploadedImage.success,
            code: uploadedImage.code,
            images: uploadedImage.updatedItem.listOfImages,
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

exports.updateImage = async (req, res) => {
    try {
        const image = req.file
        if (!image) return res.status(400).json({
            success: false,
            code: 400,
            message: "Image is required"
        });
        const updatedImage = await item.updateImage(req.query._id, image.path, req.query.index);
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