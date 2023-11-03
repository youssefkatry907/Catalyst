let product = require("../../modules/Product/product.repo");

exports.add = async (req, res) => {
    try {
        let result = await product.addProduct(req.body);
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
        let result = await product.listProducts();
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