let Item = require('./item.model');
const { uploadImageToCloudinary } = require('../../utils/fileUpload')

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

exports.searchItem = async (filter) => {
    try {
        let isNumber = !isNaN(filter.searchTerm);
        let items;
        if (isNumber) {
            items = await Item.find({
                $or: [
                    { price: { $eq: filter.searchTerm } },
                    { weight: { $eq: filter.searchTerm } }
                ]
            }).lean();
        }
        else {
            items = await Item.find({
                $or: [
                    { type: { $eq: filter.searchTerm } },
                    { name: { $eq: filter.searchTerm } },
                    { manufacturer: { $eq: filter.searchTerm } }
                ]
            }).lean();
        }
        return {
            success: true,
            code: 200,
            items
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



exports.listItems = async () => {
    try {
        let Items = await Item.find().lean();
        return {
            success: true,
            code: 200,
            Items
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
        const newItem = new Item(form);
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

exports.update = async (_id, image) => {
    try {
        const item = await this.isExist({ _id });
        // console.log(`item`, item)
        if (item.success) {
            const result = await uploadImageToCloudinary(image, "8888", "items");
            console.log(`result`, result)
            await Item.findByIdAndUpdate({ _id }, {
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
                message: "item not found"
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

