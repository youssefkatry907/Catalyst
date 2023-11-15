let metal = require('../../modules/Metal/metal.repo');

exports.get = async (req, res) => {
    try {
        const result = await metal.getPrices(req.query.userId);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}

exports.timeseries = async (req, res) => {
    try {
        const result = await metal.getPricesHistory();
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}