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
        console.log(item);
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