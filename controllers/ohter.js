
qrCodeActiceCheck = (cardId) => {
    return new Promise((resolve, reject) => {
        const { cardId } = visiorInfo
        qrCodeModel.findOne({ originalCode: cardId })
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
    })
}