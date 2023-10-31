let Slider = require("./slider.model");

exports.addSlider = async (form) => {
    try {
        let slider = new Slider(form);
        await slider.save();
        return {
            success: true,
            code: 200,
            slider,
            message: "slider added successfully"
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

exports.listSliders = async () => {
    try {
        let sliders = await Slider.find();
        return {
            success: true,
            code: 200,
            sliders,
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