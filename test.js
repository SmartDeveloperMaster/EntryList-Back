const bcrypt = require("bcrypt");

const PW = 'abcd1234';
const encryptedPW = bcrypt.hashSync(PW, 10);

console.log(encryptedPW);

const isTrue = bcrypt.compare(PW, encryptedPW).then((isTrue) => {
  console.log(isTrue);
}).catch((err) => {
  console.log(err);
})

// console.log(isTrue);