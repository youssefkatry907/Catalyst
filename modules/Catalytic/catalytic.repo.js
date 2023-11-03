let Catalytic = require("./catalytic.model");

exports.addCatalytic = async (form) => {
    try {
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