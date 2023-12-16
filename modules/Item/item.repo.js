let Item = require('./item.model');
let user = require('../User/user.repo');
const { uploadImageToCloudinary } = require('../../utils/fileUpload');

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
                    { type: { $regex: filter.searchTerm, $options: "i" } },
                    { name: { $regex: filter.searchTerm, $options: "i" } },
                    { manufacturer: { $regex: filter.searchTerm, $options: "i" } }
                ]
            }).lean();
        }

        let sz = Math.min(items.length, 10);

        for (let i = 0; i < sz; ++i) {
            items[i].searchCount++;
            await Item.updateOne({ _id: items[i]._id },
                {
                    $set: { searchCount: items[i].searchCount }
                });
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



exports.listItems = async (filter) => {
    try {
        let Items = await Item.find(filter).lean();
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

exports.createItem = async (form) => {
    try {
        let item = await this.isExist(form);
        if (item.success) return {
            success: false,
            code: 409,
            message: "You created this item before"
        }
        let userData = await user.get({ _id: form.userId });

        if (!userData.success) return {
            success: false,
            code: 404,
            message: "user not found"
        }

        const newItem = new Item(form);
        newItem.price = newItem.price - (newItem.price * (userData.data.appDiscount + userData.data.countryDiscount + userData.data.hiddenDiscount) / 100);
        await newItem.save();
        return {
            success: true,
            code: 201,
            item: newItem
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

exports.createAdminItem = async (form) => {
    try {
        let item = await this.isExist(form);

        const newItem = new Item(form);
        await newItem.save();

        if (item.success) return {
            success: true,
            code: 201,
            item: newItem,
            message: "You created this item before"
        }

        return {
            success: true,
            code: 201,
            item: newItem
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

exports.uploadImage = async (_id, image) => {
    try {
        const item = await this.isExist({ _id });
        if (item.success) {
            let updatedItem = await Item.findByIdAndUpdate({ _id }, {
                image: {
                    url: image.Location.replace("/image", `/${process.env.BUCKET_ID}:image`),
                    public_id: image.key
                }
            }, { new: true });
            return {
                success: true,
                code: 201,
                updatedItem,
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

exports.uploadMultipleImages = async (_id, image) => {
    try {
        const item = await this.isExist({ _id });
        if (item.success) {
            let public_id = Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7);
            const result = await uploadImageToCloudinary(image, public_id, "items");
            let updatedItem = await Item.findByIdAndUpdate({ _id }, {
                $push: {
                    listOfImages: {
                        url: result.url,
                        public_id: result.public_id
                    }
                }
            }, { new: true });
            return {
                success: true,
                code: 201,
                updatedItem,
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
            message: "item not found"
        };
    }

}

exports.mostSearchedItems = async () => {
    try {
        let items = await Item.find().sort({ searchCount: -1 }).limit(3).lean();
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

exports.updateItem = async (_id, form) => {
    try {
        let item = await this.isExist({ _id });
        if (!item.success) return {
            success: false,
            code: 404,
            message: "item not found"
        };
        let updatedItem = await Item.findByIdAndUpdate({ _id }, form, { new: true });
        return {
            success: true,
            code: 200,
            updatedItem,
            message: "item updated successfully"
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

exports.deleteItem = async (_id) => {
    try {
        let item = await this.isExist({ _id });
        if (!item.success) return {
            success: false,
            code: 404,
            message: "item not found"
        };
        await Item.findByIdAndDelete({ _id });
        return {
            success: true,
            code: 200,
            message: "item deleted successfully"
        };
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        }
    }
}

exports.updateImage = async (_id, image, index) => {
    try {
        const item = await this.isExist({ _id });
        if (item.success) {
            let public_id = Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7);
            const result = await uploadImageToCloudinary(image, public_id, "items");
            let updatedItem = await Item.findByIdAndUpdate({ _id }, {
                $set: {
                    [`listOfImages.${index}`]: {
                        url: result.url,
                        public_id: result.public_id
                    }
                }
            }, { new: true });
            return {
                success: true,
                code: 201,
                updatedItem,
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
            message: "item not found"
        };
    }

}


