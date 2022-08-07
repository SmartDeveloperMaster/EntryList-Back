const bcrypt = require("bcrypt");

const { qrCodeModel } = require("../models/qrCode");
const { visitorModel } = require("../models/visitor");

const qrCodeExistCheck = (visiorInfo) => {
    const { cardId } = visiorInfo
    return new Promise((resolve, reject) => {
        qrCodeModel.findOne({ originalCode: cardId })
        .then((result) => {
            if(result.isActive === false){
                resolve(qrCodeVerification(cardId, result))
            }else{
                // qrCode를 사용중임. 빠꾸먹일것
                resolve(false)
            }
        }).catch((err) => {
            resolve(false)
        }
    )
    })
} 

const qrCodeVerification = async(cardId, qrCodeInfo) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(cardId,qrCodeInfo.encryptedCode)
        .then(result => {
            if(result === true){resolve(true)}
            else{resolve(false)}
        })
        .catch(err => {
            resolve(err)
        })
    })
}

const createVisitorData = (visitorInfo) => {
    return new Promise((resolve, reject) => {
        visitorModel.create(visitorInfo)
        .then(result => {
            resolve(true)
        }).catch(err => {
            resolve(false)
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
            resolve(false)
        }
    )
    })
}

module.exports = { createVisitorData, qrCodeExistCheck, qrCodeVerification, exitData };