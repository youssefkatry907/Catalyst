let User = require('./user.model');
let bcrypt = require('bcrypt');

exports.isExist = async (filter) => {
    try {
        const user = await User.findOne(filter).lean();
        if (!user) {
            return {
                success: false,
                error: "User not found",
                code: 404
            }
        }
        return {
            success: true,
            record: user,
            code: 200
        }

    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}

exports.get = async (filter) => {
    try {
        if (filter) {
            let record = await User.find(filter).lean();
            return {
                success: true,
                record,
                code: 200
            };
        }
        else return {
            success: false,
            code: 404,
            message: `${filter} not found`

        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}

exports.create = async (form) => {
    try {
        let user
        if (form.email) {
            form.email = form.email.toLowerCase()
            user = await this.isExist({ email: form.email });
            if (user.success) return { success: false, error: "This email already exists", code: 409 };
        }

        if (form.phoneNumber) {
            user = await this.isExist({ phoneNumber: form.phoneNumber });
            if (user.success) return { success: false, error: "This phone number already exists", code: 409 };
        }

        let newUser = new User(form);
        await newUser.save();
        return {
            success: true,
            code: 201
        };

    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}

exports.comparePassword = async (email, password) => {
    try {
        if (email != undefined) {
            email = email.toLowerCase();
        }
        let result = await this.isExist({ email })
        //console.log(`result`, result);
        if (!result.success) return result;

        let match = await bcrypt.compare(password, result.record.password)
        // remove password from result
        delete result.record.password;
        if (match) return {
            success: true,
            record: result.record,
            code: 200
        }
        else return {
            success: false,
            code: 409,
            message: "password doesn't match"
        }

    } catch (err) {
        console.log(`err.message500`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}