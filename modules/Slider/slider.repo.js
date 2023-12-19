let Slider = require("./slider.model");

exports.addSlider = async (form) => {
    try {
        let sliders = await Slider.find({}).lean();
        if (sliders.length > 0) {
            let slider = sliders[0];
            for (let i = 0; i < form.listOfSliders.length; i++) {
                slider.listOfSliders.push(form.listOfSliders[i]);
            }
            await Slider.findByIdAndUpdate({ _id: slider._id }, { listOfSliders: slider.listOfSliders }, { new: true });
            return {
                success: true,
                code: 200,
                message: "sliders added successfully"
            };
        }
        else {
            let slider = new Slider(form);
            await slider.save();
            return {
                success: true,
                code: 200,
                message: "New sliders added successfully"
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

exports.listSliders = async () => {
    try {
        let sliders = await Slider.find().lean();
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

exports.deleteSlider = async (idx) => {
    try {
        let sliders = await Slider.find({}).lean();
        if (idx < 0 || idx > sliders[0].listOfSliders.length - 1) return {
            success: false,
            code: 400,
            message: "invalid index"
        };
        let slider = sliders[0].listOfSliders[idx];
        await Slider.findOneAndUpdate({}, { $pull: { listOfSliders: slider } }, { new: true });
        return {
            success: true,
            code: 200,
            message: "slider deleted successfully"
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