let admin = require('../../modules/Admin/admin.repo');

exports.userDiscount = async (req, res) => {
    try {
        const result = await admin.applyDiscount(req.query.userId, req.body);
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

exports.countryDiscount = async (req, res) => {
    try {
        const result = await admin.applyCountryDiscount(req.body.country, req.body.discount);
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

exports.list = async (req, res) => {
    try {
        const result = await admin.listUsers(req.query);
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