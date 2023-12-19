let fav = require('../../modules/Favorite/favorite.repo');

exports.get = async (req, res) => {
    try {
        const filter = req.query;
        const result = await fav.get(filter);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}

exports.updateFavList = async (req, res) => {
    try {
        const result = await fav.updateItemsInFav(req.query.favListId, req.query.itemId, req.query.userId);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}