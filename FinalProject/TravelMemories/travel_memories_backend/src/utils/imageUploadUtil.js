/* Author Dhrumil Amish Shah */
const multer = require('multer');

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    }
});

const imageFilter = (req, file, callback) => {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        return callback(new Error("Only jpg, jpeg and png files are allowed!"), false);
    }
    callback(null, true);
};

const imageUploadUtil = multer({ storage: storage, fileFilter: imageFilter });

module.exports = imageUploadUtil;