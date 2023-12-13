let slider = require("../../modules/Slider/slider.repo");

exports.add = async (req, res) => {
    try {
        let result = await slider.addSlider(req.body);
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
        let result = await slider.listSliders();
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
        let result = await slider.deleteSlider(req.params.idx);
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