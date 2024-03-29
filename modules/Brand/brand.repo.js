let Brand = require("../../modules/Brand/brand.model");

exports.isExist = async (filter) => {
    try {
        const brand = await Brand.findOne(filter).lean();
        if (!brand) {
            return {
                success: false,
                code: 404,
                message: "Brand not found",
            }
        }
        return {
            success: true,
            code: 200,
            brand
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

exports.listBrands = async (filter) => {
    try {
        let brands = await Brand.find(filter).lean();
        return {
            success: true,
            code: 200,
            brands
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

exports.createBrand = async (form) => {
    try {
        let brand = await this.isExist({ name: form.name });
        if (brand.success) return {
            success: false,
            code: 409,
            message: "You created this brand before"
        }

        let newBrand = new Brand(form);
        await newBrand.save();
        return {
            success: true,
            code: 201,
            brand: newBrand,
            message: "brand created successfully",
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

exports.updateImage = async (_id, image) => {
    try {
        const brand = await this.isExist({ _id });
        if (brand.success) {
            let updatedBrand = await Brand.findByIdAndUpdate({ _id }, {
                image: {
                    url: image.Location.replace("/image", `/${process.env.BUCKET_ID}:image`),
                    public_id: image.key
                }
            }, { new: true });
            return {
                success: true,
                code: 201,
                url: updatedBrand.image.url
            };
        }
        else {
            return {
                success: false,
                code: 404,
                message: "brand not found"
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

exports.deleteBrand = async (_id) => {
    try {
        let brand = await this.isExist({ _id });
        if (brand.success) {
            await Brand.findByIdAndDelete({ _id });
            return {
                success: true,
                code: 200,
                message: "brand deleted successfully"
            };
        }
        else {
            return {
                success: false,
                code: 404,
                message: "brand not found"
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

exports.updateBrand = async (_id, form) => {
    try {
        const brand = await this.isExist({ _id });
        if (brand.success) {
            let updatedBrand = await Brand.findByIdAndUpdate({ _id }, form, { new: true });
            return {
                success: true,
                code: 200,
                brand: updatedBrand,
                message: "brand updated successfully"
            };
        }

        return {
            success: false,
            code: 404,
            message: "brand not found"
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