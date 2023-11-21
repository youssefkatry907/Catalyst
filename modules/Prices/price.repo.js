let Price = require('./price.model');

exports.addPrices = async (form) => {
    try {
        let newPrice = await Price.findOne({ subscriptionType: form.subscriptionType }).lean();
        if (newPrice) {

            newPrice.subscriptionType = form.subscriptionType;
            if (form.subscriptionType == "Bro") {
                newPrice.month = form.month;
                newPrice.year = form.year;
            }
            newPrice.totalMonthlyPrice = form.totalMonthlyPrice;
            newPrice.totalYearlyPrice = form.totalYearlyPrice;

            await Price.findByIdAndUpdate(newPrice._id, newPrice);
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
            prices
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