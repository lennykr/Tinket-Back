const User = require('../models/User');
const BaseRepository = require('./BaseRepository');
const bcrypt = require('bcrypt');

class UserRepository extends BaseRepository {
    constructor() {super(User);}

    async findByCredentials(email, password) {
        const user = await User.findOne({email});

        if (!await bcrypt.compare(password, user.password))
            throw new Error('Onjuiste inloggegevens');

        return user;
    }
}

module.exports = UserRepository;
