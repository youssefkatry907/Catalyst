let subscription = require('../../modules/Subscribtion/subscription.repo');

exports.get = async (req, res) => {
    try {
        let result = await subscription.getSubscription(req.query.userId);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        })
    }
}

exports.list = async (req, res) => {
    try {
        let result = await subscription.listSubscriptions(req.query);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        })
    }
}