const User = require('../models/User');
const BaseRepository = require('./BaseRepository');
const bcrypt = require('bcrypt');
const {BadRequestError} = require('../exceptions');

class UserRepository extends BaseRepository {
    constructor() {super(User);}

    async read(objectId) {
        const document = await this.model.findById(objectId)
            .populate('makerProfile.skills')
            .populate('companyProfile.skills');
        if (document == null)
            throw new Error(`Document with ObjectId ${objectId} not found`);
        return document;
    }

    async findByCredentials(email, password) {
        const user = await User.findOne({email}).select(['+password', '+tokens']);

        if (user == null || !await bcrypt.compare(password, user.password))
            throw new BadRequestError('Email of wachtwoord onjuist!');

        return user;
    }
}

module.exports = UserRepository;
