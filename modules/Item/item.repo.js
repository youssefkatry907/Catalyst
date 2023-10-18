let Item = require('./item.model');

exports.isExist = async (filter) => {
    try {
        const item = await Item.findOne(filter).lean();
        if (!item) {
            return {
                success: false,
                code: 404,
                message: "Item not found",
            }
        }
        return {
            success: true,
            item,
            code: 200
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

exports.getItem = async (_id) => {
    try {
        let item = await this.isExist({ _id });
        return item;
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}


exports.listItems = async () => {
    try {
        let Items = await Item.find().lean();
        return {
            success: true,
            Items,
            code: 200
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

exports.addItem = async (form) => {
    try {
        let item = await this.isExist(form);
        if (item.success) return {
            success: false,
            code: 409,
            message: "This item already exists"
        }
        let newItem = new Item(form);
        await newItem.save();
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

exports.update = async (_id, form) => {
    try {
        const item = await this.isExist({ _id });
        // console.log(`item`, item);
        if (item.success) {
            if (form.email) {
                const duplicate = await this.isExist({ email: form.email });
                if (duplicate.success && duplicate.record._id != item.record._id)
                    return {
                        success: false,
                        error: "This Email is taken by another user",
                        code: 409
                    };
            }
            let updatedItem = await Item.findByIdAndUpdate({ _id }, form);
            return {
                success: true,
                code: 201,
                updatedItem
            };
        }
        else {
            return {
                success: false,
                error: "item not found",
                code: 404
            };
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }

}