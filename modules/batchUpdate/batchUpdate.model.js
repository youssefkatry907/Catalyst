let mongoose = require("mongoose");

let batchUpdateSchema = mongoose.Schema({
    arrayOfKeys: [{ type: String }]
})


let batchUpdateModel = mongoose.model("batchUpdate", batchUpdateSchema)


module.exports = batchUpdateModel;