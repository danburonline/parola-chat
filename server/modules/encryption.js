const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
// const key = crypto.randomBytes(32);
let iv = Buffer.from('abc3456789034565'); // TODO Solve this problem, so that it's initially random

const encrypt = (text, plainUUID) => {
  // const iv = crypto.randomBytes(16);
  let key = plainUUID;
  // Creating Cipheriv with its parameter
  let cipher = crypto.createCipheriv(algorithm, key, iv);

  // Updating text
  let encrypted = cipher.update(text);

  // Using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Returning iv and encrypted data
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};

const decrypt = (text, plainUUID) => {
  let key = plainUUID;
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');

  // Creating Decipher
  let decipher = crypto.createDecipheriv(algorithm, key, iv);

  // Updating encrypted text
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // returns data after decryption
  return decrypted.toString();
};

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
