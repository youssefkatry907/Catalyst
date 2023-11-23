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

exports.changePassword = async (req, res) => {
    try {
        const result = await user.resetPassword(
            req.query._id, req.body.currentPassword,
            req.body.newPassword, req.body.confirmPassword
        );
        return res.status(result.code).json({
            success: result.success,
            code: result.code,
            message: result.message
        });
    } catch (err) {
        console.log(`err.message`, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }

}

exports.updateProfile = async (req, res) => {
    try {
        const result = await user.update(req.query._id, req.body);
        return res.status(result.code).json({
            success: result.success,
            code: result.code,
            message: result.message,
            record: result.updatedUser
        });
    } catch (err) {
        console.log(`err.message`, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await user.deleteUser(req.query._id, req.body.password);
        return res.status(result.code).json({
            success: result.success,
            code: result.code,
            message: result.message
        });
    } catch (err) {
        console.log(`err.message`, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}

exports.logout = async (req, res) => {
    try {
        const result = await user.logout(req.query._id);
        res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}