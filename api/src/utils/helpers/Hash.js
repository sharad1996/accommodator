/**
 * Helper module
 */
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export default class Hash {
  static generatePasswordHash(password) {
    return crypto.pbkdf2Sync(password, process.appConfig.hashSaltKey, 1000, 64, `sha512`).toString(`hex`);
  }

  static generateToken(obj, expireTime = '24h') {
    return jwt.sign(obj, process.appConfig.hashSaltKey, { expiresIn: expireTime });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.appConfig.hashSaltKey);
  }

  static encrypt(data, type = '') {
    const cipher = crypto.createCipher('aes-128-cbc', `${process.appConfig.hashSaltKey}-${type}`);
    let encryptedString = cipher.update(data, 'utf8', 'hex');
    encryptedString += cipher.final('hex');
    return encryptedString;
  }

  static decrypt(encryptedData, type = '') {
    const decipher = crypto.createDecipher('aes-128-cbc', `${process.appConfig.hashSaltKey}-${type}`);
    let decryptedString = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedString += decipher.final('utf8');
    return decryptedString;
  }
}
