const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    nickname: String,
    firstname: String,
    lastname: String,
    password: String,
    role: String,
});

module.exports = mongoose.model('AdminSchema', AdminSchema);