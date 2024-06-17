const bcrypt = require("bcrypt");

const Utils = {
  encryptPassword: (password) => {
    return new Promise((resolve, reject) => {
      let saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt).then((hash) => {
          resolve(hash);
        });
      });
    });
  },

  compareHashedPassword: (passowrd, hashedPassword) => {
    console.log(passowrd, hashedPassword);
    return new Promise((resolve, reject) => {
      bcrypt.compare(passowrd, hashedPassword, (err, result) => {
        resolve(result);
      });
    });
  },
};

module.exports = Utils;
