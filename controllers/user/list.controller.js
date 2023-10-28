let list = require('../../modules/List/list.repo');

exports.getList = async (req, res) => {
    try {
        const filter = req.query;
        const result = await list.get(filter);
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

exports.create = async (req, res) => {
    try {
        const result = await list.createList(req.body);
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

exports.addItem = async (req, res) => {
    try {
        const result = await list.addItemToList(req.query.listId, req.query.itemId);
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

exports.removeItem = async (req, res) => {
    try {
        const result = await list.removeItemFromList(req.query.listId, req.query.itemId);
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
        const result = await list.deleteList(req.query.listId);
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

exports.updateQuantity = async (req, res) => {
    try {
        const result = await list.updateItemQuantity(req.query.listId, req.body);
        return res.status(result.code).json({
            success: true,
            code: 200,
            items: result.items,
            message: 'Item quantity updated'
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