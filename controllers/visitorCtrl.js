const bcrypt = require("bcrypt");

const { qrCodeModel } = require("../models/qrCode");
const { visitorModel } = require("../models/visitor");

const qrCodeExistCheck = (visiorInfo) => {
    const { cardId } = visiorInfo
    return new Promise((resolve, reject) => {
        qrCodeModel.findOne({ originalCode: cardId })
        .then((result) => {
            resolve(result)
            console.log(result.originalCode)
        }).catch((err) => {
            reject(err)
        }
    )
    })
} 

const qrCodeVerification = (qrCode) => {

}

const createVisitorData = (visitorInfo) => {
    return new Promise((resolve, reject) => {
        visitorModel.create(visitorInfo)
        .then((result) => {
            resolve(true)
        }).catch((err) => {
            reject(err)
        }
    )
    })
}

const exitData = (visitorInfo) => {
    return new Promise((resolve, reject) => {
        const { cardId } = visitorInfo
        const exitTime = date = new Date().toLocaleString({timeZone: "Asia/Seoul"})
        visitorModel.findOneAndUpdate({cardId, isEntrance:true}, 
            {isEntrance: false, exitTime, cardId:null})
        .then((result) => {
            resolve(true)
        }).catch((err) => {
            reject(err)
        }
    )
    })
}

module.exports = { createVisitorData, qrCodeExistCheck, qrCodeVerification, exitData };