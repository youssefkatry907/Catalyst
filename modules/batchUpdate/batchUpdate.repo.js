let batchUpdate = require("./batchUpdate.model")

exports.list = async (filter) => {
  try {
    let records = await batchUpdate.find(filter).lean()
    return {
      success: true,
      records,
      code: 200
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      message: err.message
    }
  }

}

exports.createMany = async (arrayOfFiles) => {
  try {
    const newfile = new batchUpdate({ arrayOfKeys: arrayOfFiles });
    await newfile.save();
    return {
      success: true,
      record: newfile,
      code: 201
    };
  } catch (err) {
    return {
      success: false,
      code: 500,
      message: err.message
    };
  }
}


exports.remove = async () => {
  try {
    await batchUpdate.deleteMany({})
    return {
      success: true,
      code: 200
    };
  } catch (err) {
    return {
      success: false,
      code: 500,
      message: err.message
    };
  }

}