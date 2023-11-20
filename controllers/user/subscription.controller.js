let subscription = require("../../modules/Subscribtion/subscription.repo")

exports.create = async (req, res) => {
    try {
        let result = await subscription.createSubscription(req.body);
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