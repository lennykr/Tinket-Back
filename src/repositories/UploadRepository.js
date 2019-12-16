const Upload = require('../models/Upload');
const BaseRepository = require('./BaseRepository');

class UploadRepository extends BaseRepository {
    constructor() {super(Upload);}
}

module.exports = UploadRepository;
