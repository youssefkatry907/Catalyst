let catalytic = require("../../modules/Catalytic/catalytic.repo");

exports.add = async (req, res) => {
    try {
        let result = await catalytic.addCatalytic(req.body);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}

exports.list = async (req, res) => {
    try {
        let result = await catalytic.listCatalytics();
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}

exports.delete = async (req, res) => {
    try {
        let result = await catalytic.deleteCatalytic(req.query._id);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }

}

exports.update = async (req, res) => {
    try {
        let result = await catalytic.updateCatalytic(req.query._id, req.body);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }

}