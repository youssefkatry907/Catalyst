let Metal = require('./metal.model');
let User = require('../User/user.model');
const axios = require('axios');

exports.addPrices = async (form) => {
    try {
        const metals = await Metal.find({}).lean();
        if (metals.length > 0) {
            const metal = metals[0];
            metal.pd = form.pd, metal.pt = form.pt;
            metal.rh = form.rh, metal.au = form.au;

            if (metal.pdDaily.length == 4) metal.pdDaily.shift()
            if (metal.ptDaily.length == 4) metal.ptDaily.shift()
            if (metal.rhDaily.length == 4) metal.rhDaily.shift()
            if (metal.auDaily.length == 4) metal.auDaily.shift()
            if (metal.date.length == 4) metal.date.shift()

            metal.pdDaily.push(form.pd);
            metal.ptDaily.push(form.pt);
            metal.rhDaily.push(form.rh);
            metal.auDaily.push(form.au);
            metal.date.push(form.date);

            await Metal.findByIdAndUpdate(metal._id, metal);
            return {
                success: true,
                code: 201,
                message: "Metal prices updated successfully"
            };
        }

        else {
            let metal = new Metal();
            metal.pd = form.pd, metal.pt = form.pt;
            metal.rh = form.rh, metal.au = form.au;

            metal.pdDaily.push(form.pd);
            metal.ptDaily.push(form.pt);
            metal.rhDaily.push(form.rh);
            metal.auDaily.push(form.au);
            metal.date.push(form.date);

            await metal.save();
            return {
                success: true,
                code: 201,
                message: "New metal prices added successfully"
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

exports.getLatestPrices = async () => {
    try {
        let url = "https://metals-api.com/api/latest?access_key=7250zrlr6ydnw1xsl1yuep9fwc821q92th8tpg52c8x4j3jc6byvbt0ksma9&base=USD&symbols=XAU%2CXAG%2CXPD%2CXPT%2CXRH";
        const response = await axios.get(url);
        let ok = response.data.success;
        let res = response.data;
        if (!ok) {
            return {
                success: false,
                code: 500,
                message: res.data.error
            };
        }
        let currentTime = new Date().toLocaleString();
        await this.addPrices({
            pd: res.rates.USDXPD,
            pt: res.rates.USDXPT,
            rh: res.rates.USDXRH,
            au: res.rates.USDXAU,
            date: currentTime
        });

        return {
            success: true,
            code: 200,
            data: res.rates,
            message: "Metal prices fetched successfully"
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
