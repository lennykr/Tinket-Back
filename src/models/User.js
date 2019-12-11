const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const profile = {
    contactInfo: {
        email: String,
        phoneNumber: String,
        linkedIn: String
    },

    location: {
        country: String,
        city: String,
        postalCode: String,
    },
};

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: props => `${props.value} is not a valid email address!`
        },
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },

    makerProfile: {
        type: {
            displayName: {
                type: String,
                required: true,
                trim: true,
            },
            bio: {
                type: String,
                required: true,
            },
            experience: {
                type: String,
                required: true,
            },
            dateOfBirth: {
                type: Date,
                required: true,
            },
            skills: [{
                type: Schema.Types.ObjectId,
                ref: 'Skill',
                required: true,
            }],
            ...profile,
        },
        required: false,
    },

    companyProfile: {
        type: {
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },

            ...profile,
        },
        required: false,
    },

    isAdmin: Boolean,

    createdAt: {
        type: Schema.Types.Date,
        default: () => moment().format(),
        required: true,
    },

    tokens: {
        type: [{
            token: {
                type: String,
                required: true
            }
        }],
        select: false,
    },
});

/**
 * Hash the password before saving the user model
 */
UserSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

/**
 * Generates a new JWT for the user.
 */
UserSchema.methods.generateAuthToken = function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({token});

    return user.save().then(() => {
        return token;
    });
};

module.exports = mongoose.model('User', UserSchema);
