let User = require('./user.model');
let bcrypt = require('bcrypt');

exports.isExist = async (filter) => {
    try {
        const user = await User.findOne(filter).lean();
        console.log("Loooool",user);
        if (user) return {
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
            record = await User.find(filter).lean();
            return {
                success: true,
                record,
                code: 200
            };
        }
        else return {
            success: false,
            code: 404,
            error: `${filter} not found`

        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
}

exports.comparePassword = async (filter, password) => {
    try {
        if (filter.email != undefined) { 
            filter.email = filter.email.toLowerCase();
            //console.log(filter.email," There is an email"); 
        }
        let user = await this.isExist(filter.email ? { email: filter.email } : { number: filter.number })
        //console.log(user);
        if (user.success) {
            let match = await bcrypt.compare(password, user.record.password)
            if (match) return {
                success: true,
                record: user.record,
                code: 200
            }
            else return {
                success: false,
                code: 409,
                error: "password doesn't match"
            }

        } else return {
            success: false,
            code: 404,
            error: user.error
        };
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
}