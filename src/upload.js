const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/tmp');
    },
    filename: function (req, file, cb) {
        cb(null, md5(file.fieldname + Date.now()));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
