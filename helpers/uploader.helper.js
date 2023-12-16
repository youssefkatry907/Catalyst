let multer = require('multer');

function fileFilter(req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
        cb(null, true);
    }
    else {
        cb("only .png .jpg files are allowed", false);
    };
}

const storage = multer.memoryStorage({});

const uploadImage = multer({ storage, fileFilter });

module.exports = uploadImage;
