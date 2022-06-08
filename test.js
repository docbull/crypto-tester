// crypto module
const crypto = require("crypto");
const fs = require('fs');

const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);

let file = fs.readFileSync("./data/raw_chunks/master5.ts");
console.log(file);
console.log("file length:", file.length);
console.log("string length:", file.toString().length);

// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

// the cipher function
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

// encrypt the message
// input encoding
// output encoding
let encryptedData = cipher.update(file, "utf-8", "hex");

encryptedData += cipher.final("hex");

// console.log("Encrypted message: " + encryptedData);
console.log("Encrypted file length:", encryptedData.length);

// the decipher function
const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

decryptedData += decipher.final("utf8");

// console.log("Decrypted message: " + decryptedData);
console.log("Dcrypted file length (string):", decryptedData.length);
var buf = Buffer.from(decryptedData, 'utf8');
console.log("Dcrypted file length (Buffer):", buf.length);