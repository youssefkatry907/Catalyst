let metal = require('../../modules/Metal/metal.repo');

exports.add = async (req, res) => {
    try {
        const result = await metal.addPrices(req.body);
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

exports.addHistory = async (req, res) => {
    try {
        const result = await metal.addPricesHistory(req.body);
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

exports.getLatest = async (req, res) => {
    try {
        const result = await metal.getLatestPrices();
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





