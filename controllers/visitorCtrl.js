const abrequire = require('abrequire');
// const { visitorModel } = require(abrequire("models/visitor"));
// const { QrCodeModel } = require(abrequire("models/qrCode"));

// const SALTING = parseInt(process.env.SALTING);

const sendVisitorData = (result) => {
    console.log(result)
    console.log(typeof result)
    return result
} 

module.exports = { sendVisitorData };