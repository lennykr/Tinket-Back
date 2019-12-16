const {config, uploader} = require('cloudinary').v2;
const {resource} = require('cloudinary').v2.api;
const {UploadRepository} = require('../repositories/index');

class UploadService {
    constructor() {
        config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
    }

    /**
     * Upload video to cloudinary CDN
     * @param dataURI
     * @param name
     * @return {Promise<void>}
     */
    async uploadToCDN(dataURI, name) {
        const pendingUpload = await UploadRepository.create({
            pending: true,
        });

        await uploader.upload(dataURI, {
            resource_type: 'video',
            // overwrite: false,
            async: true,
            eager_async: true,
            //discard_original_filename: false,
            notification_url: `${process.env.NOTIFICATION_URL}/upload/${pendingUpload._id}`,
           // public_id: name,
            chunk_size: 6000000
        });

        return pendingUpload;
    }

    async getResource(publicId) {
        const result = await resource(publicId, {
            resource_type: 'video'
        });
        return result;
    }

    async updatePendingUpload(id, uploadResult) {
        await UploadRepository.update(id, {pending: false, publicId: uploadResult.public_id});
    }

    async getUploaded(id) {
        const upload = await UploadRepository.read(id);

        if (upload.pending)
            return upload;

        const uploadInfo = await this.getResource(upload.publicId);

        return {
            pending: upload.pending,
            publicId: uploadInfo.public_id,
            url: uploadInfo.secure_url,
            createdAt: uploadInfo.created_at,
            format: uploadInfo.format
        };
    }
}

module.exports = UploadService;
