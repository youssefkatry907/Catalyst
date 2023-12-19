let Catalog = require('./catalog.model');

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
        let catalog = await Catalog.findOne({ _id }).populate("userId").lean();
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
            }).populate("userId").lean();
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
            }).populate("userId").lean();
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
        let catalogs = await Catalog.find(filter).populate("userId").lean();
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
        newCatalog = await Catalog.findOne({ _id: newCatalog._id }).populate("userId").lean();

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
        newCatalog = await Catalog.findOne({ _id: newCatalog._id }).populate("userId").lean();

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
            let updatedCatalog = await Catalog.findByIdAndUpdate({ _id }, image, { new: true })
                .populate("userId");

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
            let updatedCatalog = await Catalog.findByIdAndUpdate({ _id }, {
                image: {
                    url: image.Location.replace("/image", `/${process.env.BUCKET_ID}:image`),
                    public_id: image.key
                }
            }, { new: true });
            return {
                success: true,
                code: 201,
                url: updatedCatalog.image.url
            };
        }

        return {
            success: false,
            code: 404,
            message: "catalog not found"
        };
    } catch (err) {
        console.log(`Repo err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }

}