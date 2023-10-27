let Catalog = require('./catalog.model');
const { uploadImageToCloudinary } = require('../../utils/fileUpload')

exports.isExist = async (filter) => {
    try {
        const catalog = await Catalog.findOne(filter).lean();
        if (!catalog) {
            return {
                success: false,
                code: 404,
                message: "Catalog not found",
            }
        }
        return {
            success: true,
            code: 200,
            catalog
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

exports.getCatalog = async (_id) => {
    try {
        if (!_id) return {
            success: false,
            code: 400,
            message: "Catalog id is required"
        }
        let catalog = await Catalog.findOne({ _id }).lean();
        return {
            success: true,
            code: 200,
            catalog
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

exports.listCatalogs = async (filter) => {
    try {
        let catalogs = await Catalog.find(filter).lean();
        return {
            success: true,
            code: 200,
            catalogs
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

exports.createCatalog = async (form) => {
    try {
        let catalog = await this.isExist(form);
        if (catalog.success) return {
            success: false,
            code: 409,
            message: "You created this catalog before"
        }

        let newCatalog = new Catalog(form);
        await newCatalog.save();
        return {
            success: true,
            code: 201,
            message: "catalog created successfully",
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

exports.updateCatalog = async (_id, form) => {
    try {
        let catalog = await this.isExist({ _id });
        if (catalog.success) {
            let updatedCatalog = await Catalog.findByIdAndUpdate({ _id }, form, { new: true });

            return {
                success: true,
                code: 200,
                catalog: updatedCatalog
            };
        }
        return {
            success: false,
            code: 404,
            message: "catalog not found"
        };

    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message,
        };
    }
}

exports.updateImage = async (_id, image) => {
    try {
        const catalog = await this.isExist({ _id });
        if (catalog.success) {
            const result = await uploadImageToCloudinary(image, "8888", "catalogs");
            await Catalog.findByIdAndUpdate({ _id }, {
                image: {
                    url: result.url,
                    public_id: result.public_id
                }
            });
            return {
                success: true,
                code: 201,
                url: result.url
            };
        }
        else {
            return {
                success: false,
                code: 404,
                message: "catalog not found"
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