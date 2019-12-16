const UploadService = require("../services").UploadService;
const promiseResponseHelper = require("../helpers").promiseResponseHelper;

class UploadController {
    /**
     * Upload video to cloudinary CDN
     * @param req
     * @param res
     */
    uploadVideo(req, res) {
        promiseResponseHelper(req, res, UploadService.uploadToCDN(req.uploadedFileDataURI, req.file.originalname));
    }

    /**
     * Called by cloudinary when an async upload is done
     * @param req
     * @param res
     */
    onUploadDone(req, res) {
        promiseResponseHelper(req, res, UploadService.updatePendingUpload(req.params.id, req.body));
    }

    /**
     * Get an upload entry from database
     * @param req
     * @param res
     */
    getUploaded(req, res) {
        promiseResponseHelper(req, res, UploadService.getUploaded(req.params.id));
    }
}

module.exports = UploadController;
