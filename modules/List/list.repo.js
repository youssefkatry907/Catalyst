let List = require('./list.model');
let item = require('../Item/item.repo');

exports.isExist = async (filter) => {
    try {
        const list = await List.findOne(filter).lean();
        if (!list) {
            return {
                success: false,
                code: 404,
                message: "List not found"
            }
        }
        return {
            success: true,
            code: 200,
            list
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

exports.createList = async (form) => {
    try {
        let list = new List(form);
        await list.save();
        return {
            success: true,
            code: 201,
            list
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

exports.isItemInList = async (listOfItems, itemId) => {
    try {
        let i = -1;
        const result = await listOfItems.find((item, index) => {
            if (item._id == itemId) {
                i = index;
                return item;
            }
        });

        if (!result) return {
            success: false,
            code: 404,
            message: "Item not found"
        }

        return {
            success: true,
            code: 200,
            result,
            index: i
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


exports.get = async (filter) => {
    try {
        let lists, list;
        if (filter._id) {
            list = await List.findOne(filter).lean().populate('listOfItems');
            return {
                success: true,
                code: 200,
                list
            };
        }
        lists = await List.find(filter).lean().select('-listOfItems');
        return {
            success: true,
            code: 200,
            lists
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

exports.deleteList = async (listId) => {
    try {
        let result = await this.isExist({ _id: listId });
        if (!result.success) return result;
        await List.deleteOne({ _id: listId });
        return {
            success: true,
            code: 200,
            message: "List deleted successfully"
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

exports.addItemToList = async (listId, itemId) => {
    try {
        let itemResult = await item.isExist({ _id: itemId });
        let result = await this.isExist({ _id: listId });

        if (!itemResult.success) return itemResult;
        if (!result.success) return result;

        let itemExists = await this.isItemInList(result.list.listOfItems, itemId);
        if (itemExists.success) return {
            success: false,
            code: 409,
            message: "Item already in the list"
        }

        result.list.listOfItems.push(itemId);
        result.list.numOfItems++;
        result.list.totalPrice += itemResult.item.price;

        await List.findByIdAndUpdate({ _id: listId }, {
            listOfItems: result.list.listOfItems,
            numOfItems: result.list.numOfItems,
            totalPrice: result.list.totalPrice
        }, { new: true });

        result = await List.findOne({ _id: listId }).populate('listOfItems').lean();

        return {
            success: true,
            code: 200,
            list: result
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

exports.removeItemFromList = async (listId, itemId) => {
    try {
        let itemResult = await item.isExist({ _id: itemId });
        let result = await this.isExist({ _id: listId });

        if (!itemResult.success) return itemResult;
        if (!result.success) return result;

        let itemExists = await this.isItemInList(result.list.listOfItems, itemId);

        if (!itemExists.success) return {
            success: false,
            code: 404,
            message: "Item not found"
        }


        result.list.listOfItems.splice(itemExists.index, 1);
        result.list.numOfItems--;
        result.list.totalPrice -= itemResult.item.price;

        await List.findByIdAndUpdate({ _id: listId }, {
            listOfItems: result.list.listOfItems,
            numOfItems: result.list.numOfItems,
            totalPrice: result.list.totalPrice
        }, { new: true });

        result = await List.findOne({ _id: listId }).populate('listOfItems').lean();

        return {
            success: true,
            code: 200,
            list: result
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
