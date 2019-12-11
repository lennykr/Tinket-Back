const User = require('../models/User');
const BaseRepository = require('./BaseRepository');
const bcrypt = require('bcrypt');
const {BadRequestError} = require('../exceptions');

class UserRepository extends BaseRepository {
    constructor() {super(User);}

    async findByCredentials(email, password) {
        const user = await User.findOne({email});

        if (user == null || !await bcrypt.compare(password, user.password))
            throw new BadRequestError('Email of wachtwoord onjuist!');

        return user;
    }
}

module.exports = UserRepository;
