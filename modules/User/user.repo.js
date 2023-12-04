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
        if (!filter) return {
            success: false,
            code: 404,
            message: "filter is required"
        }
        let data = await User.findOne(filter).lean().select("-password");
        return {
            success: true,
            code: 200,
            data
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
        if (!result.success) return result;

        if (result.record.numOfUsers && result.record.devicesCount) {
            if (result.record.devicesCount == result.record.numOfUsers) return {
                success: false,
                code: 409,
                message: "Sorry, you reached the maximum number of users allowed in your plan"
            }
        }
        let match = await bcrypt.compare(password, result.record.password)
        delete result.record.password;

        if (!match) return {
            success: false,
            code: 409,
            message: "password isn't correct"
        }

        let user = await User.findByIdAndUpdate({ _id: result.record._id },
            { devicesCount: result.record.devicesCount + 1 },
            { new: true });

        result.record.numOfUsers = user.numOfUsers;

        return {
            success: true,
            record: result.record,
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

exports.resetPassword = async (_id, currentPassword, newPassword, confirmPassword) => {
    try {
        let user = await this.isExist({ _id })
        let saltrouds = 5;
        let oldPassword = user.record.password;
        let ok = await bcrypt.compare(currentPassword, oldPassword)

        if (user.success) {

            if (!ok) return {
                success: false,
                code: 409,
                message: "current password isn't correct"
            };

            if (newPassword == currentPassword) return {
                success: false,
                code: 409,
                message: "new password must be different from current password"
            };

            if (newPassword != confirmPassword) return {
                success: false,
                code: 409,
                message: "passwords don't match"
            };

            const hashedPassword = await bcrypt.hash(newPassword, saltrouds)
            await User.findByIdAndUpdate(_id, { password: hashedPassword })
            return {
                success: true,
                code: 200,
                message: "password changed successfully"
            };
        }
        else return {
            success: false,
            code: 404,
            message: user.message
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

exports.update = async (_id, form) => {
    try {
        const user = await this.isExist({ _id });
        let duplicate;
        if (user.success) {

            if (form.email) {
                duplicate = await this.isExist({ email: form.email });
                if (duplicate.success && duplicate.record._id.toString() != user.record._id.toString()) return {
                    success: false,
                    code: 409,
                    message: "This email already exists"
                };
            }

            if (form.phoneNumber) {
                duplicate = await this.isExist({ phoneNumber: form.phoneNumber });
                if (duplicate.success && duplicate.record._id.toString() != user.record._id.toString()) return {
                    success: false,
                    code: 409,
                    message: "This phone number already exists"
                };
            }

            let updatedUser = await User.findByIdAndUpdate({ _id }, form, { new: true });
            return {
                success: true,
                code: 201,
                updatedUser
            };
        }
        else {
            return {
                success: false,
                code: 404,
                message: "user not found"
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
            if (user.record.devicesCount > 0)
                await User.findByIdAndUpdate({ _id }, { devicesCount: user.record.devicesCount - 1 },
                    { new: true })

            return {
                success: true,
                code: 200,
                message: "Logged out successfully"
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

exports.deleteUser = async (_id, password) => {
    try {
        let result = await this.isExist({ _id })
        if (result.success) {
            let match = await bcrypt.compare(password, result.record.password)
            if (match) {
                await User.findByIdAndDelete({ _id })
                return {
                    success: true,
                    code: 200,
                    message: "User deleted successfully"
                };
            }
            return {
                success: false,
                code: 409,
                message: "password isn't correct"
            }
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
