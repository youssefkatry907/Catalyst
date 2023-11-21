let Price = require('./price.model');

exports.addPrices = async (form) => {
    try {
        let prices = await Price.find({}).lean();
        if (prices.length > 0) {
            const price = prices[0];
            
            price.subscriptionType = form.subscriptionType;
            price.month = form.month;
            price.year = form.year;
            price.totalMonthlyPrice = form.totalMonthlyPrice;
            price.totalYearlyPrice = form.totalYearlyPrice;

            await Price.findByIdAndUpdate(price._id, price);
            return {
                success: true,
                code: 201,
                message: "Prices updated successfully"
            }
        }
        let price = new Price(form);
        await price.save();
        return {
            success: true,
            code: 201,
            message: "Prices created successfully"

        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        }
    }
}

exports.getPrices = async () => {
    try {
        let prices = await Price.find({});
        if (!prices) return {
            success: false,
            code: 404,
            message: "Prices not found"
        }
        return {
            success: true,
            code: 200,
            prices: prices[0]
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        }
    }
}