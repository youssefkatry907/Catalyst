let Calculator = require('./calculator.model');

exports.calculate = async (form) => {
    try {
        let { pdGram, ptGram, pdPpm, ptPpm, rhGram, rhPpm, weight, exchangeRate } = form;
        let pd = pdGram + (pdPpm / 100000);
        let pt = ptGram + (ptPpm / 100000);
        let rh = rhGram + (rhPpm / 100000);
        let price = ((pd * 0.98) + (pt * 0.98) + (rh * 0.90)) * weight * exchangeRate;
        return {
            success: true,
            code: 201,
            price
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