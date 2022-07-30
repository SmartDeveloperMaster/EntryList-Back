const { Schema, model } = require('mongoose');

const undividedDate = new Date()

const visitorSchema = new Schema({
    visitorName : {type: String, required: true},
    visitorPhoneNumber : {type: String, required: true},
    visitorDivision : {type: String, required: true},
    visitorReason : {type: String, required: true},
    entranceTime : {type: String},
    exitTime : {type: String, default:null},
    isEntrance : {type: Boolean, default: true},
    cardId: {type:String, required:true},
    temperature: {type:String, required:true},
    entranceDate: { year: {type:Number, default:undividedDate.getFullYear()}, 
                    month: {type:Number, default:undividedDate.getMonth()+1},
                    day: {type:Number, default:undividedDate.getDate()}
                }
}, {timestamps: true});

exports.visitorModel = model('visitor', visitorSchema);