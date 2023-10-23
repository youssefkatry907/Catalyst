let multer = require('multer');

function fileFilter(req,file,cb){
    if(file.mimetype=="image/png" || file.mimetype=="image/jpeg" || file.mimetype=="image/jpg" ) {
        cb(null,true);
    }
    else {
        cb("only .png .jpg files are allowed",false);
    };
}

const storage = multer.diskStorage({});

const uploadImage = multer({ storage , fileFilter });

module.exports = uploadImage;

// exports.uploadImage = (folderName) => {
//   const storage = multer.diskStorage({});

//   return multer({ storage: storage });

// }

// exports.handleFileUploadErrors = (error, req, res, next) => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === "LIMIT_FILE_SIZE") {
//       return res.status(400).json({
//         message: "file is too large",
//       });
//     }

//     if (error.code === "LIMIT_FILE_COUNT") {
//       return res.status(400).json({
//         message: "File limit reached",
//       });
//     }

//     if (error.code === "LIMIT_UNEXPECTED_FILE") {
//       return res.status(400).json({
//         message: "File must be an image",
//       });
//     }
//   }
// }