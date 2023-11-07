let user = require('../../modules/User/user.repo');
let jwt = require('../../helpers/jwt.helper');
const sendEmail = require("../../utils/email.util").sendEmail
const sendOtpCode = require("../../utils/sms.util").sendOtp


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

}

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
}

exports.generateRecoveryCode = async (req, res) => {
    try {
        if (req.body.email) req.body.email = req.body.email.toLowerCase()
        const result = await user.isExist({ email: req.body.email })
        if (result.success) {
            let randomCode = Math.floor(Math.random() * 1000000);
            payload = {
                _id: result.record._id, name: result.record.name, email: result.record.email,
                code: randomCode
            }
            console.log(`randomCode`, randomCode);
            const token = jwt.generateToken(payload);
            let reciever = result.record.email;

            let subject = "Reset Your Password";
            let text = "You have forgotten your password, here is your recovery code";
            let html = `<h3>You have forgotten your password, here is your recovery code</h3><h1 style="color: #008080; font-size: 24px; font-family: Arial, sans-serif;">${randomCode}</h1>`;
            let email = await sendEmail(reciever, subject, text, html)
            if (email.success)
                return res.status(email.code).json({ success: true, code: 201, token });
            // if (token) return res.status(201).json({ success: true, code: 201, token });
            else return res.status(404).json({ message: "Email not found", code: 404, success: false });
        }
        else return res.status(404).json(result);


    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
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

exports.generateOtpCode = async (req, res) => {
    try {
        const result = await user.isExist({ phoneNumber: req.body.number })
        if (result.success) {
            let randomCode = Math.floor(Math.random() * 1000000);
            payload = {
                _id: result.record._id, name: result.record.name, number: result.record.phoneNumber,
                code: randomCode
            }
            // console.log(`randomCode`, randomCode);
            const token = jwt.generateToken(payload);
            let reciever = result.record.phoneNumber;
            // console.log(`reciever`, reciever);

            let sms = await sendOtpCode(reciever)
            if (sms.success)
                return res.status(sms.code).json({ success: true, code: 201, token });

            else return res.status(404).json({ message: "Number not found", code: 404, success: false });
        }

        return {
            success: false,
            code: 404,
            message: "Number not found"
        };
        
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}
