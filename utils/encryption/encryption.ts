import * as crypto from 'crypto';
import * as util from 'util';
const ALGORITHM = 'aes-256-cbc';
const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const SALT_LENGTH = 16;
const ITERATIONS = 100000;
const DIGEST = 'sha256';

const pbkdf2 = util.promisify(crypto.pbkdf2);

async function deriveKey(password: string, salt: string) {
    return pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, DIGEST);
}

// password is the master password entered by the user at sign up
export async function encrypt(text: string, password: string) {
    const salt = crypto.randomBytes(SALT_LENGTH);
    const key = await deriveKey(password, salt.toString('hex'));
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        salt: salt.toString('hex'),
        iv: iv.toString('hex'),
        data: encrypted
    };
}

export async function decrypt(encryptedData: { salt: string; iv: string; data: string }, password: string) {
    const salt = Buffer.from(encryptedData.salt, 'hex');
    const key = await deriveKey(password, salt.toString('hex'));
    const iv = Buffer.from(encryptedData.iv, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encryptedData.data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}