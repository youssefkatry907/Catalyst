let Metal = require('./metal.model');

exports.addPrices = async (form) => {
    try {   
        // if there isn't any metal in db, add new metal, else update the old one
        const metals = await Metal.find({}).lean();
        if (metals.length > 0) {
            const metal = metals[0];
            metal.pd = form.pd;
            metal.pt = form.pt;
            metal.rh = form.rh;
            await Metal.findByIdAndUpdate(metal._id, metal);
            return {
                success: true,
                code: 201,
                message: "Metal prices updated successfully"
            };
        }

        let metal = new Metal(form);
        await metal.save();
        return {
            success: true,
            code: 201,
            message: "New metal prices added successfully"
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

exports.getPrices = async () => {
    try {
        const metals = await Metal.find({}).lean();
        if (metals.length > 0) {
            return {
                success: true,
                code: 200,
                metal: metals[0]
            };
        }
        else {
            return {
                success: false,
                code: 404,
                message: "Metal not found"
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