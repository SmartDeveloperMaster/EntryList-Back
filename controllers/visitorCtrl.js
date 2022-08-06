const { qrCodeModel } = require("../models/qrCode");
const { visitorModel } = require("../models/visitor");

const qrCodeExistCheck = (qrCode) => {
    return new Promise((resolve, reject) => {
        qrCodeModel.findOne({ originalCode: qrCode }, {isActive:1, _id:0})
        .then((result) => {
            resolve(result.isActive)
        }).catch((err) => {
            reject(err)
        }
    )
    })
} 

const qrCodeVerification = (qrCode) => {
    console.log('test'+qrCodeExistCheck(qrCode))
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



module.exports = { createVisitorData, qrCodeExistCheck, qrCodeVerification };