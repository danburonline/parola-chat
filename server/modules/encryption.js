const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

const encrypt = (text, plainUUID) => {
  let key = crypto.createHash('md5').update(plainUUID).digest('hex');
  let iv = Buffer.from(plainUUID.substring(0, 16)); // Create buffer from IV which can only be 16 chars long
  let cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};

const decrypt = (text, plainUUID) => {
  let key = crypto.createHash('md5').update(plainUUID).digest('hex');
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
