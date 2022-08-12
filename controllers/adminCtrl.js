const { adminModel } = require('../models/admin');

const adminAccess = (requestBody) => {
    return new Promise((resolve, reject) => {
        const { adminKey } = requestBody
        adminModel.findOne({ adminkey: adminKey }).
        then(result => {
            console.log(result)
            if(result){
                resolve(true)
            }else{
                resolve(false)
            }
        }).catch(err => {
            resolve(false)
        })
    })
}

module.exports = { adminAccess }