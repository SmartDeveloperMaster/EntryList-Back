const { Schema, model } = require('mongoose');

const undividedDate = new Date()

const testSchema = new Schema({
    visitorName : {type: String, required: true},
    visitorPhoneNumber : {type: String, required: true},
    visitorDivision : {type: String, required: true},
    visitorReason : {type: String, required: true},
    entranceTime : {type: String},
    exitTime : {type: String, default:null},
    isEntrance : {type: Boolean, default: true},
    cardId: {type:String, required:true },
    temperature: {type:String, required:true},
    entranceYear: {type:Number, default:undividedDate.getFullYear()}, 
    entranceMonth: {type:Number, default:undividedDate.getMonth()+1},
    entranceDay: {type:Number, default:undividedDate.getDate()}
}, {timestamps: true});

exports.testModel = model('test', testSchema);