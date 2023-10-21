let user = require('../../modules/User/user.repo');

exports.getUser = async (req, res) => {
    try {
        const filter = req.query;
        const userData = await user.get(filter);
        return res.status(userData.code).json({
            success: userData.success,
            code: userData.code,
            userData: userData.data
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