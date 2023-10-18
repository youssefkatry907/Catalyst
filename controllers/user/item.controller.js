let item = require('../../modules/Item/item.repo');
let path = require('path');

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
        let update = await item.update(req.query._id, { image: newImage[0] });
        // console.log(`update`, update.updatedItem.image);
        return res.status(update.code).json({
            success: update.success,
            code: update.code,
            image: newImage
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