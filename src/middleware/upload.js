const multer = require('multer');
const DataUri = require('datauri');
const {extname} = require('path');

// store file in memory (compared to writing it to a file first)
const storage = multer.memoryStorage();

// create multer instance & specify form field we want to use
const multipartUpload = multer({storage}).single('video');

// convert req.file to dataURI (base64 string)
const fileToDataUri = file => new DataUri().format(extname(file.originalname).toString(), file.buffer);

const videoConvert = (req, res, next) => {
    // convert file to dataURI
    req.uploadedFileDataURI = fileToDataUri(req.file).content;

    next();
};


module.exports = {multipartUpload, videoConvert};
