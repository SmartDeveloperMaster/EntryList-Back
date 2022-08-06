const { visitorModel } = require("../models/visitor");

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

module.exports = { createVisitorData };