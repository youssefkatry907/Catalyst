let user = require('../../modules/User/user.repo');
let jwt = require('../../helpers/jwt.helper');


exports.register = async (req, res) => {
    try {
        const result = await user.create(req.body);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }

};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let result = await user.comparePassword(email, password);
        if (!result.success) return res.status(result.code).json(result);
        payload = {
            _id: result.record._id, name: result.record.name,
            email: result.record.email,
            number: result.record.number,
            role: result.record.role
        }
        const token = jwt.generateToken(payload);
        return res.status(result.code).json({
            success: result.success,
            token,
            code: result.code,
            userData: result.record
        })
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
};

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

};

exports.logout = async (req, res) => {
    try {
        const result = await user.logout(req.query._id);
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
};

