const { Schema, model } = require('mongoose');

const visitorSchema = new Schema({
    visitorName : {type: String, required: true},
    visitorPhoneNumber : {type: String, required: true},
    visitorDivision : {type: String, required: true},
    visitorReason : {type: String, required: true},
    entranceTime : {type: Date},
    exitTime : {type: Date},
    isEntrance : {type: Boolean, default: false},
}, {timestamps: true});

exports.visitorModel = model('visitor', visitorSchema);