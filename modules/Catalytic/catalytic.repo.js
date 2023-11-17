let Catalytic = require("./catalytic.model");

exports.isExist = async (filter) => {
    try {
        const catalytic = await Catalytic.findOne(filter).lean();
        if (!catalytic) {
            return {
                success: false,
                code: 404,
                message: "catalytic not found",
            }
        }
        return {
            success: true,
            code: 200,
            catalytic
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

exports.addCatalytic = async (form) => {
    try {
        let existedCatalytic = await this.isExist({ name: form.name });
        if (existedCatalytic.success) return {
            success: false,
            code: 409,
            message: "You created this catalytic before"
        }
        let catalytic = new Catalytic(form);
        await catalytic.save();
        return {
            success: true,
            code: 200,
            catalytic,
            message: "catalytic added successfully"
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

exports.listCatalytics = async () => {
    try {
        let catalytics = await Catalytic.find();
        return {
            success: true,
            code: 200,
            catalytics,
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

exports.deleteCatalytic = async (_id) => {
    try {
        let catalytic = await this.isExist({ _id });
        if (catalytic.success) {
            await Catalytic.findByIdAndDelete({ _id });
            return {
                success: true,
                code: 200,
                message: "catalytic deleted successfully"
            };
        }
        else {
            return {
                success: false,
                code: 404,
                message: "catalytic not found"
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

exports.updateCatalytic = async (_id, form) => {
    try {
        const catalytic = await this.isExist({ _id });
        if (catalytic.success) {
            let updatedCatalytic = await Catalytic.findByIdAndUpdate({ _id }, form, { new: true });
            return {
                success: true,
                code: 200,
                catalytic: updatedCatalytic,
                message: "catalytic updated successfully"
            };
        }

        return {
            success: false,
            code: 404,
            message: "catalytic not found"
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