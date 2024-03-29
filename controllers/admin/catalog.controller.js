let catalog = require("../../modules/Catalog/catalog.repo");
let admin = require("../../modules/Admin/admin.repo");
const s3StorageHelper = require('../../utils/fileUpload');

exports.create = async (req, res) => {
    try {
        const result = await catalog.createAdminCatalog(req.body);
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

exports.delete = async (req, res) => {
    try {
        const result = await catalog.deleteCatalog(req.query._id);
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
        const file = req.file;
        if (!file) return res.status(400).json({
            success: false,
            code: 400,
            message: "Image is required"
        });
        const image = await s3StorageHelper.uploadFileToS3('catalogs', file);
        const uploadedImage = await catalog.updateImage(req.query._id, image);
        return res.status(uploadedImage.code).json({
            success: uploadedImage.success,
            code: uploadedImage.code,
            image: uploadedImage.url
        });
    } catch (err) {
        console.log(`New err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}


exports.approve = async (req, res) => {
    try {
        const result = await admin.approveCatalogRequest(req.query._id);
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

exports.refuse = async (req, res) => {
    try {
        const result = await admin.refuseCatalogRequest(req.query._id);
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

exports.search = async (req, res) => {
    try {
        const result = await catalog.searchCatalog(req.query);
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

