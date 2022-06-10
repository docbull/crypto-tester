const crypto = require("crypto");
const fs = require('fs');
const path = require('path');

const algorithm = "aes-256-cbc";
const password = "docbullwatson";

function encrypt(buffer) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return crypted;
}

function decrypt(buffer) {
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = Buffer.concat([decipher.update(buffer), decipher.final()]);
    return dec;
}

async function encryptVideoChunks(inputPath, outputPath) {
    fs.readdir(path.join(inputPath), (err, files) => {
        if (files) {
            console.log("🚀 Start to encrypt video chunks!");
            files.forEach(fileName => {
                let chunk = fs.readFileSync(`${inputPath}/${fileName}`);
                console.log(chunk);
                console.log("🗂  chunk length:", chunk.length);

                var encrypted = encrypt(chunk);
                console.log("🎁 encrypted chunk legnth:", encrypted.length);
                try {
                    fs.writeFileSync(`${outputPath}/${fileName}`, encrypted);
                } catch (err) {
                    console.error(err);
                }
            })
            console.log("********** CHUNKS ARE ENCRYPTED **********");
            console.log("😀 It finished to encrypt all chunks in the directory.");
        }
    })
}

async function decryptVideoChunks(inputPath, outputPath) {
    fs.readdir(path.join(inputPath), (err, files) => {
        if (files) {
            console.log("...");
            console.log("🚀 Start to decrypt encrypted chunks!");
            files.forEach(fileName => {
                let encryptedChunk = fs.readFileSync(`${inputPath}/${fileName}`);
                console.log(encryptedChunk);
                console.log("🎁 encrypted chunk length:", encryptedChunk.length);

                var decrypted = decrypt(encryptedChunk);
                console.log("🗂  decrypted chunk legnth:", decrypted.length);
                try {
                    fs.writeFileSync(`${outputPath}/${fileName}`, decrypted);
                } catch (err) {
                    console.error(err);
                }
            })
            console.log("********** CHUNKS ARE DECRYPTED **********");
            console.log("😎 Now it finished to decrypt all encrypted chunks. You can compare the chunks using diff command in ubuntu.");
        }
    })
}

encryptVideoChunks('./data/raw_chunks', './data/encrypted_chunks');
decryptVideoChunks('./data/encrypted_chunks', './data/raw_chunks');