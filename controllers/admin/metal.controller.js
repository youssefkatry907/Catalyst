let metal = require('../../modules/Metal/metal.repo');

exports.add = async (req, res) => {
    try {
        const result = await metal.addPrices(req.body);
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