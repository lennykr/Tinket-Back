const User = require('../models/User');
const BaseRepository = require('./BaseRepository');
const bcrypt = require('bcrypt');
const {errorResponse} = require('../helpers');

class UserRepository extends BaseRepository {
    constructor() {super(User);}

    async findByCredentials(email, password) {
        const user = await User.findOne({email});


        console.log(user);
        if (!await bcrypt.compare(password, user.password))
            throw new Error(errorResponse('Onjuiste inloggegevens'));

        return user;
    }
}

module.exports = UserRepository;
