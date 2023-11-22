let Metal = require('./metal.model');
let User = require('../User/user.model');

exports.addPrices = async (form) => {
    try {
        const metals = await Metal.find({}).lean();
        if (metals.length > 0) {
            const metal = metals[0];
            metal.pd = form.pd, metal.pt = form.pt, metal.rh = form.rh;

            if (metal.pdDaily.length < 4) metal.pdDaily.push(form.pd);
            else metal.pdDaily.shift(), metal.pdDaily.push(form.pd);

            if (metal.ptDaily.length < 4) metal.ptDaily.push(form.pt);
            else metal.ptDaily.shift(), metal.ptDaily.push(form.pt);

            if (metal.rhDaily.length < 4) metal.rhDaily.push(form.rh);
            else metal.rhDaily.shift(), metal.rhDaily.push(form.rh);

            await Metal.findByIdAndUpdate(metal._id, metal);
            return {
                success: true,
                code: 201,
                message: "Metal prices updated successfully"
            };
        }

        let metal = new Metal(form);
        metal.pdDaily.push(form.pd);
        metal.ptDaily.push(form.pt);
        metal.rhDaily.push(form.rh);
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

exports.addPricesHistory = async (form) => {
    try {
        const metals = await Metal.find({}).lean();
        const metal = metals[0];
        if (form.pdHistory) {
            await Metal.findByIdAndUpdate(metal._id, {
                $set: { pdHistory: form.pdHistory }
            });
        }

        if (form.ptHistory) {
            await Metal.findByIdAndUpdate(metal._id, {
                $set: { ptHistory: form.ptHistory }
            });
        }

        if (form.rhHistory) {
            await Metal.findByIdAndUpdate(metal._id, {
                $set: { rhHistory: form.rhHistory }
            });
        }

        return {
            success: true,
            code: 201,
            message: "The history of prices updated successfully"
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

exports.getPrices = async (userId) => {
    try {
        const user = await User.findOne({ _id: userId }).lean();

        const metals = await Metal.find({}).lean();

        if (user.pd > 0) metals[0].pd = Math.min(metals[0].pd, user.pd);
        if (user.pt > 0) metals[0].pt = Math.min(metals[0].pt, user.pt);
        if (user.rh > 0) metals[0].rh = Math.min(metals[0].rh, user.rh);

        delete metals[0].pdHistory;
        delete metals[0].ptHistory;
        delete metals[0].rhHistory;

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

exports.getPricesHistory = async () => {
    try {
        const metals = await Metal.find({}).lean();
        return {
            success: true,
            code: 200,
            pdHistory: metals[0].pdHistory,
            ptHistory: metals[0].ptHistory,
            rhHistory: metals[0].rhHistory
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