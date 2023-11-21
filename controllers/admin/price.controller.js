let price = require("../../modules/Prices/price.repo");

exports.add = async (req, res) => {
    try {
        let result = await price.addPrices(req.body);
        res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        })
    }
}

exports.get = async (req, res) => {
    try {
        let result = await price.getPrices();
        res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        })
    }
}