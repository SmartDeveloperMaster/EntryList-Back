const { Schema, model } = require('mongoose');

const visitorSchema = new Schema({
    visitorName : {type: String, required: true},
    visitorPhoneNumber : {type: String, required: true},
    visitorDivision : {type: String, required: true},
    visitorReason : {type: String, required: true},
    entranceTime : {type: String, default:"null"},
    exitTime : {type: String, default:null},
    isEntrance : {type: Boolean, default: true},
    cardId: {type:String, required:true},
    temperature: {type:String, required:true}
}, {timestamps: true});

exports.visitorModel = model('visitor', visitorSchema);