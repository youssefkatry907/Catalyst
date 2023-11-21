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

exports.approve = async (req, res) => {
    try {
        let result = await subscription.approveSubscription(req.query._id);
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

exports.refuse = async (req, res) => {
    try {
        let result = await subscription.refuseSubscription(req.query._id);
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