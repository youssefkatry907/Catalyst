let admin = require('../../modules/Admin/admin.repo');

exports.getAdmin = async (req, res) => {
    try {
        const filter = req.query;
        const adminData = await admin.get(filter);
        return res.status(adminData.code).json({
            success: adminData.success,
            code: adminData.code,
            adminData: adminData.data
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
        const result = await admin.resetPassword(
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
        const result = await admin.update(req.query._id, req.body);
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
        const result = await admin.deleteAdmin(req.query._id, req.body.password);
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