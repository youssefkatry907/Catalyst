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
        if (!catalog) return {
            success: false,
            code: 404,
            message: "Catalog not found"
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

exports.searchCatalog = async (filter) => {
    try {
        let isNumber = !isNaN(filter.searchTerm);
        let catalogs;
        if (isNumber) {
            catalogs = await Catalog.find({
                $or: [
                    { weight: { $eq: filter.searchTerm } },
                    { pd: { $eq: filter.searchTerm } },
                    { pt: { $eq: filter.searchTerm } },
                    { rh: { $eq: filter.searchTerm } }
                ]
            }).lean();
        }
        else {
            catalogs = await Catalog.find({
                $or: [
                    { brand: { $regex: filter.searchTerm, $options: "i" } },
                    { name: { $regex: filter.searchTerm, $options: "i" } },
                    { product: { $regex: filter.searchTerm, $options: "i" } },
                    { isHyprid: { $regex: filter.searchTerm, $options: "i" } },
                    { status: { $regex: filter.searchTerm, $options: "i" } }
                ]
            }).lean();
        }
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
        newCatalog = await Catalog.findOne({ _id: newCatalog._id }).lean();

        return {
            success: true,
            code: 201,
            catalog: newCatalog,
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

exports.createAdminCatalog = async (form) => {
    try {
        let catalog = await this.isExist(form);

        let newCatalog = new Catalog(form);
        await newCatalog.save();
        newCatalog = await Catalog.findOne({ _id: newCatalog._id }).lean();

        if (catalog.success) return {
            success: true,
            code: 201,
            catalog: newCatalog,
            message: "You created this catalog before"
        }

        return {
            success: true,
            code: 201,
            catalog: newCatalog,
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

exports.updateCatalog = async (_id, image) => {
    try {
        let catalog = await this.isExist({ _id });
        if (catalog.success) {
            let updatedCatalog = await Catalog.findByIdAndUpdate({ _id }, image, { new: true });

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

exports.deleteCatalog = async (_id) => {
    try {
        let catalog = await this.isExist({ _id });
        if (catalog.success) {
            await Catalog.findByIdAndDelete({ _id });
            return {
                success: true,
                code: 200,
                message: "catalog deleted successfully"
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
            let public_id = Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7);
            const result = await uploadImageToCloudinary(image.path, public_id, "catalogs");
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
            message: err.message
        };
    }
};