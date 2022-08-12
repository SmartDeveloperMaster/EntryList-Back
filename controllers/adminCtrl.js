const { adminModel } = require('../models/admin');

const adminAccess = (requestBody) => {
    return new Promise((resolve, reject) => {
        const { password } = requestBody
        adminModel.findOne({ adminKey: password })
        .then(result => {
            if(result){
                console.log('데이터 존재함')
                resolve(true)
            }else{
                console.log('데이터 존재하지 않음')
                resolve(false)
            }
        })
        .catch(err => {
            console.log('값 안들어옴')
            resolve(false)
        })
    })
}

module.exports = { adminAccess }