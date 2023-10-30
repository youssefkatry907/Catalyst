let Admin = require('./admin.model');
let bcrypt = require('bcrypt');

exports.isExist = async (filter) => {
    try {
        const admin = await Admin.findOne(filter).lean();
        if (!admin) {
            return {
                success: false,
                code: 404,
                message: "Admin not found"
            }
        }
        return {
            success: true,
            code: 200,
            record: admin
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
        let data = await Admin.findOne(filter).lean().select("-password");
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
        let admin
        if (form.email) {
            form.email = form.email.toLowerCase()
            admin = await this.isExist({ email: form.email });
            if (admin.success) return { success: false, message: "This email already exists", code: 409 };
        }

        if (form.phoneNumber) {
            admin = await this.isExist({ phoneNumber: form.phoneNumber });
            if (admin.success) return { success: false, message: "This phone number already exists", code: 409 };
        }

        let newAdmin = new Admin(form);
        await newAdmin.save();
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
            message: "password isn't correct"
        }

    } catch (err) {
        console.log(`err.message5`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}

exports.resetPassword = async (_id, currentPassword, newPassword, confirmPassword) => {
    try {
        let admin = await this.isExist({ _id })
        let saltrouds = 5;
        let oldPassword = admin.record.password;
        let ok = await bcrypt.compare(currentPassword, oldPassword)

        if (admin.success) {

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
            await Admin.findByIdAndUpdate(_id, { password: hashedPassword })
            return {
                success: true,
                code: 200,
                message: "password changed successfully"
            };
        }
        else return {
            success: false,
            code: 404,
            message: admin.message
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
        const admin = await this.isExist({ _id });
        let duplicate;
        if (admin.success) {

            if (form.email) {
                duplicate = await this.isExist({ email: form.email });
                if (duplicate.success && duplicate.record._id.toString() != admin.record._id.toString()) return {
                    success: false,
                    code: 409,
                    message: "This email already exists"
                };
            }
            
            if (form.phoneNumber) {
                duplicate = await this.isExist({ phoneNumber: form.phoneNumber });
                if (duplicate.success && duplicate.record._id.toString() != admin.record._id.toString()) return {
                    success: false,
                    code: 409,
                    message: "This phone number already exists"
                };
            }

            let updatedAdmin = await Admin.findByIdAndUpdate({ _id }, form, { new: true });
            return {
                success: true,
                code: 201,
                updatedAdmin
            };
        }
        else {
            return {
                success: false,
                code: 404,
                message: "admin not found"
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

exports.deleteAdmin = async (_id, password) => {
    try {
        let result = await this.isExist({ _id })
        if (result.success) {
            let match = await bcrypt.compare(password, result.record.password)
            if (match) {
                await Admin.findByIdAndDelete({ _id })
                return {
                    success: true,
                    code: 200,
                    message: "Admin deleted successfully"
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
            message: "Admin not found"
        };
    } catch (err) {
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}