let item = require('../../modules/Item/item.repo');

exports.add = async (req, res) => {
    try {
        const result = await item.addItem(req.body);
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

exports.uploadImage = async (req, res) => {
    try {
        const newImage = req.files;
        const uploadedImage = await item.update(req.query._id, newImage[0].path);
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