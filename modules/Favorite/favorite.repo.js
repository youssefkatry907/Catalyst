let Fav = require('./favorite.model');

exports.isExist = async (filter) => {
    try {
        const fav = await Fav.findOne(filter).lean();
        if (!fav) {
            return {
                success: false,
                code: 404,
                message: "Favorite list not found"
            }
        }
        return {
            success: true,
            code: 200,
            record: fav
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

exports.get = async (filter) => {
    try {
        let favList = await Fav.findOne(filter).lean().populate('favItems');
        if (!favList) return {
            success: false,
            code: 404,
            message: "Favorite list not found"
        }
        return {
            success: true,
            code: 200,
            favList
        };
    }
    catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}

exports.isItemInList = async (favList, itemId) => {
    try {
        let i = -1;
        const result = await favList.find((item, index) => {
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

exports.updateItemsInFav = async (favListId, itemId) => {
    try {
        const favList = await this.isExist({ _id: favListId });

        if (!favList.success) {
            let newFavList = new Fav({
                favItems: [],
            });

            newFavList.favItems.push(itemId);
            await newFavList.save();

            return {
                success: true,
                code: 201,
                message: "Item added sucessfully to your favorite list"
            };

        }


        const itemExists = await this.isItemInList(favList.record.favItems, itemId);
        if (itemExists.success) {

            favList.record.favItems.splice(itemExists.index, 1);
            await Fav.findByIdAndUpdate({ _id: favListId }, {
                favItems: favList.record.favItems
            }, { new: true });

            return {
                success: true,
                code: 200,
                message: "Item removed sucessfully from your favorite list"
            };
        }

        favList.record.favItems.push(itemId);

        await Fav.findByIdAndUpdate({ _id: favListId },
            { favItems: favList.record.favItems }, { new: true });

        return {
            success: true,
            code: 201,
            message: "Item added sucessfully to your favorite list"
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

// exports.removeItemFromFav = async (favListId, itemId) => {
//     try {
//         const favList = await this.isExist({ _id: favListId });

//         if (!favList.success) return {
//             success: false,
//             code: 404,
//             message: "Favorite list not found"
//         }

//         const itemExists = await this.isItemInList(favList.favItems, itemId);
//         if (!itemExists.success) return {
//             success: false,
//             code: 404,
//             message: "Item not found in your favorite list"
//         }

//         favList.favItems.splice(itemExists.index, 1);
//         await favList.save();

//         return {
//             success: true,
//             code: 200,
//             message: "Item removed sucessfully from your favorite list",
//             favList
//         };
//     } catch (err) {
//         console.log(`err.message`, err.message);
//         return {
//             success: false,
//             code: 500,
//             message: err.message
//         };
//     }
// }