let brand = require("../../modules/Brand/brand.repo");

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