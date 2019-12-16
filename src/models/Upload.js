const mongoose = require('mongoose');

const SkillSchema = mongoose.Schema({
    pending: {
        type: Boolean,
        required: true,
        default: true
    },
    publicId: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Upload', SkillSchema);
