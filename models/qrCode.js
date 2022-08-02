const { Schema, model } = require('mongoose');

const QrCodeSchema = new Schema({
    originalCode : {type: String, required: true, unique: true},
    encryptedCode : {type: String ,required: true}
});

exports.QrCodeModel = model('QrCode', QrCodeSchema);