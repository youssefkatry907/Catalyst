let multer = require('multer');

const storage = multer.diskStorage({});

const uploadImage = multer({ storage });

module.exports = uploadImage;
