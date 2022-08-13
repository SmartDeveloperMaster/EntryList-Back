const bcrypt = require("bcrypt");

const { qrCodeModel } = require("../models/qrCode");
const { visitorModel } = require("../models/visitor");

const qrCodeExistCheck = (visiorInfo) => {
    return new Promise((resolve, reject) => {
        const { cardId } = visiorInfo
        qrCodeModel.findOne({ originalCode: cardId })
        .then((result) => {
            if(result.isActive === false){
                resolve(qrCodeVerification(cardId, result))
                // resolve(true)
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

qrCodeActiceCheck = (cardNumber) => {
    return new Promise((resolve, reject) => {
        const { cardId } = cardNumber
        qrCodeModel.findOne({ originalCode: cardId }, {isActive:1, _id:0})
        .then(result => {
            if(result){
                console.log(result)
            }
            else{
                console.log(`err ${result}`)
            }
        })
        .catch(err => {
            // 존재하지 않는 qrCode이다.
            console.log(err)
        })
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
            console.log("데이터 생성 완료")
            resolve(true)
        }).catch(err => {
            console.log(err)
            resolve(false)
        }
    )
    })
}


const exitVisitor = (visitorInfo) => {
    return new Promise((resolve, reject) => {
        const { cardId } = visitorInfo
        console.log(cardId)
        const exitTime = date = new Date().toTimeString().split(" ")[0];
        visitorModel.findOneAndUpdate({cardId, isEntrance:true},
            {isEntrance: false, exitTime, cardId:null})
        .then((result) => {
            if(result !== null){
                // console.log(result)
                resolve(true)
            }else{
                console.log(result)
                resolve(false)
            }
        }).catch((err) => {
            resolve(false)
            console.log(err)
        }
    )
    })
}

module.exports = { createVisitorData, qrCodeExistCheck, exitVisitor };