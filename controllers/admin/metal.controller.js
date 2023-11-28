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

// I want to fetch the metals api every 6 hours and store the data in the database.

exports.get = async (req, res) => {
    async function callThirdPartyService() {
        try {
            const result = await metal.getLatestPrices();
            console.log(`result`, result);
            return res.status(result.code).json({
                success: result.success,
                code: result.code,
                message: result.message,
                data: result.data
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

    function initiateAPI() {
        callThirdPartyService();
        setInterval(callThirdPartyService, 6 * 60 * 60 * 1000);
    }

    initiateAPI();
}
