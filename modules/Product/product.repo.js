let Product = require("./product.model");

exports.isExist = async (filter) => {
    try {
        const product = await Product.findOne(filter).lean();
        if (!product) {
            return {
                success: false,
                code: 404,
                message: "product not found",
            }
        }
        return {
            success: true,
            code: 200,
            product
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

exports.addProduct = async (form) => {
    try {
        let existedProduct = await this.isExist({ name: form.name });
        if (existedProduct.success) return {
            success: false,
            code: 409,
            message: "You created this product before"
        }
        let product = new Product(form);
        await product.save();
        return {
            success: true,
            code: 201,
            product,
            message: "product created successfully"
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

exports.deleteProduct = async (_id) => {
    try {
        let product = await this.isExist({ _id });
        if (product.success) {
            await Product.findByIdAndDelete({ _id });
            return {
                success: true,
                code: 200,
                message: "product deleted successfully"
            };
        }

        return {
            success: false,
            code: 404,
            message: "product not found"
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

exports.updateProduct = async (_id, form) => {
    try {
        const product = await this.isExist({ _id });
        if (product.success) {
            let updatedProduct = await Product.findByIdAndUpdate({ _id }, form, { new: true });
            return {
                success: true,
                code: 200,
                product: updatedProduct,
                message: "product updated successfully"
            };
        }

        return {
            success: false,
            code: 404,
            message: "product not found"
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