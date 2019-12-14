// this import is required for .populate() to work
const Application = require('../models/Application');
const BaseRepository = require('./BaseRepository');

class ApplicationRepository extends BaseRepository {
    constructor() {super(Application);}


}

module.exports = ApplicationRepository;
