const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    adminKey : {type: String, required: true, unique: true}
});

exports.adminModel = model('admin', adminSchema);
