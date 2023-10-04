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
            error: err.message
        });
    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let result = await user.comparePassword(email, password);
        if (!result.success) return res.status(result.code).json(result).select('-password');
        payload = {
            _id: result.record._id, name: result.record.name,
            email: result.record.email,
            number: result.record.number
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
}


