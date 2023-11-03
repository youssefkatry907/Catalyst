let Product = require("./product.model");

exports.addProduct = async (form) => {
    try {
        let product = new Product(form);
        await product.save();
        return {
            success: true,
            code: 200,
            product,
            message: "product added successfully"
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

exports.listProducts = async () => {
    try {
        let products = await Product.find();
        return {
            success: true,
            code: 200,
            products,
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