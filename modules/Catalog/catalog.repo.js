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

exports.getCatalog = async (filter) => {
    try {
        let catalog = await this.isExist(filter);
        return catalog;
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
        let Catalogs = await Catalog.find(filter).lean();
        return {
            success: true,
            code: 200,
            Catalogs
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
        let catalog = await this.isExist({ form });
        if (catalog.success) return {
            success: false,
            code: 409,
            message: "You created this catalog before"
        }

        let newCatalog = new Catalog(form);
        await newCatalog.save();
        return {
            success: true,
            code: 201
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
            let updatedCatalog = await Catalog.findByIdAndUpdate({ _id }, form);
            return {
                success: true,
                code: 200,
                updatedCatalog
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