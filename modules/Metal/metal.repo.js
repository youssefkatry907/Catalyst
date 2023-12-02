let Metal = require('./metal.model');
let User = require('../User/user.model');
const axios = require('axios');
let CronJob = require('cron').CronJob;

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

        let date = new Date();
        let now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
            date.getUTCDate(), date.getUTCHours(),
            date.getUTCMinutes(), date.getUTCSeconds());

        let currentTime = date.toISOString()

        if (!ok) {
            return {
                success: false,
                code: 500,
                message: res.data.error
            };
        }

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

const job = new CronJob('0 0 */6 * * *', async () => {
    this.getLatestPrices();
}, null, true, 'America/Los_Angeles');
job.start();

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

        if (form.auHistory) {
            await Metal.findByIdAndUpdate(metal._id, {
                $set: { auHistory: form.auHistory }
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
        if (user.au > 0) metals[0].au = Math.min(metals[0].au, user.au);
        
        let lastPd = metals[0].pdHistory[metals[0].pdHistory.length - 1];
        let lastPt = metals[0].ptHistory[metals[0].ptHistory.length - 1];
        let lastRh = metals[0].rhHistory[metals[0].rhHistory.length - 1];
        let lastAu = metals[0].auHistory[metals[0].auHistory.length - 1];

        delete metals[0].pdHistory;
        delete metals[0].ptHistory;
        delete metals[0].rhHistory;
        delete metals[0].auHistory;

        let upAndDown = {
            pd: metals[0].pd > lastPd ? true : false,
            pt: metals[0].pt > lastPt ? true : false,
            rh: metals[0].rh > lastRh ? true : false,
            au: metals[0].au > lastAu ? true : false
        }

        if (metals.length > 0) {
            return {
                success: true,
                code: 200,
                metal: metals[0],
                upAndDown
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
            rhHistory: metals[0].rhHistory,
            auHistory: metals[0].auHistory
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
