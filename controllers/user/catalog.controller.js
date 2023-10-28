let catalog = require("../../modules/Catalog/catalog.repo");

exports.create = async (req, res) => {
    try {
        const result = await catalog.createCatalog(req.body);
        return res.status(result.code).json({
            success: result.success,
            code: result.code,
            catalog: result.catalog,
            message: result.message,
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

exports.get = async (req, res) => {
    try {
        const result = await catalog.getCatalog(req.query._id);
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
        const result = await catalog.listCatalogs(req.query);
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
        const result = await catalog.updateCatalog(req.query._id, req.body);
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
        const newImage = req.file;
        if (!newImage) return res.status(400).json({
            success: false,
            code: 400,
            message: "Image is required"
        });
        const uploadedImage = await catalog.updateImage(req.query._id, newImage.path);
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