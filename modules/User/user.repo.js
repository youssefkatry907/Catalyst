let User = require('./user.model');
let bcrypt = require('bcrypt');

exports.isExist = async (filter) => {
    try {
        const user = await User.findOne(filter).lean();
        if (!user) {
            return {
                success: false,
                code: 404,
                message: "User not found"
            }
        }
        return {
            success: true,
            code: 200,
            record: user
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
        // console.log(`filter`, filter);
        if (!filter) return {
            success: false,
            code: 404,
            message: "filter is required"
        }
        let userData = await User.find(filter).lean().select("-password");
        return {
            success: true,
            code: 200,
            userData
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

exports.create = async (form) => {
    try {
        let user
        if (form.email) {
            form.email = form.email.toLowerCase()
            user = await this.isExist({ email: form.email });
            if (user.success) return { success: false, message: "This email already exists", code: 409 };
        }

        if (form.phoneNumber) {
            user = await this.isExist({ phoneNumber: form.phoneNumber });
            if (user.success) return { success: false, message: "This phone number already exists", code: 409 };
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

exports.resetPassword = async (_id, newPassword) => {
    try {
        let user = await this.isExist({ _id })
        let saltrouds = 5;
        if (user.success) {
            const hashedPassword = await bcrypt.hash(newPassword, saltrouds)
            await User.findByIdAndUpdate(_id, { password: hashedPassword })
            return {
                success: true,
                code: 200
            };
        } 
        else return {
            success: false,
            code: 404,
            error: user.message
        };
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.update = async (_id, form) => {
    try {
        const user = await this.isExist({ _id });
        if (user.success) {
            if (form.email) {
                const duplicate = await this.isExist({ email: form.email });
                if (duplicate.success && duplicate.record._id != user.record._id)
                    return {
                        success: false,
                        code: 409,
                        message: "This Email is taken by another user"
                    };
            }
            let updatedUser = await User.findByIdAndUpdate({ _id }, form);
            console.log(`updatedUser`, updatedUser);
            return {
                success: true,
                code: 201,
                updatedUser
            };
        }
        else {
            return {
                success: false,
                error: "user not found",
                code: 404
            };
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

exports.logout = async (_id) => {
    try {
        let user = await this.isExist({ _id })
        if (user.success) {
            await User.findOneAndUpdate({ _id }, { token: null })
            return {
                success: true,
                code: 200
            };
        } else return {
            success: false,
            code: 404,
            message: "User not found"
        };
    } catch (err) {
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}
