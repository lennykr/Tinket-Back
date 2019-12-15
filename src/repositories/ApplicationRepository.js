// this import is required for .populate() to work
const Application = require('../models/Application');
const BaseRepository = require('./BaseRepository');

class ApplicationRepository extends BaseRepository {
    constructor() {super(Application);}

    readInclEverything(id) {
        return this.model.findById(id)
            .populate('maker')
            .populate('assignment');
    }

    readEverythingWhere(filter, ...toPopulate) {
        console.log(filter);
        return this.model.find(filter)
            .populate(toPopulate);
    }

}

module.exports = ApplicationRepository;
