var CryptoJS = require("crypto-js");
var fs = require("fs");
var FileReader = require("filereader")

// function encrypt(input) {
//   var file = input.files[0];
//   var reader = new FileReader();
//   reader.onload = () => {
//     var key = "INLab";
//     var wordArray = CryptoJS.lib.WordArray.create(reader.result);
//     var encrypted = CryptoJS.AES.encrypt(wordArray, key).toString();

//     var fileEnc = new Blob([encrypted]);
  

//   }
// }

function convertWordArrayToUint8Array(wordArray) {
  // var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
  var arrayOfWords = wordArray.words;
  // var length = wordArray.hasOwnProperty("sigBytes") ? wordArray.sigBytes : arrayOfWords.length * 4;
  var length = wordArray.sigBytes;
  var uInt8Array = new Uint8Array(length), index=0, word, i;
  for (i=0; i<length; i++) {
      word = arrayOfWords[i];
      uInt8Array[index++] = word >> 24;
      uInt8Array[index++] = (word >> 16) & 0xff;
      uInt8Array[index++] = (word >> 8) & 0xff;
      uInt8Array[index++] = word & 0xff;
  }
  return uInt8Array;
}

async function test() {
  const key = "INLab"

  let file = fs.readFileSync("./text.txt");
  console.log(file);
  console.log("🧙‍♂️ Original file size:", file.length);
  let content = CryptoJS.lib.WordArray.create(file);
  console.log(content);
  let encrypted = CryptoJS.AES.encrypt(content, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  let res = encrypted.toString();
  const result = convertWordArrayToUint8Array(encrypted.ciphertext);
  console.log(result);
  console.log("🧙‍♂️ Encrypted file size:", result.length);

  var decrypted = CryptoJS.AES.decrypt(res, key);
  console.log(decrypted);
  // var typedArray = convertWordArrayToUint8Array(decrypted);
  // console.log(typedArray);

  // let fileReader = new FileReader();
  // fileReader.readAsArrayBuffer("./tester.sh");
  // fileReader.onload = () => {
  //   try {
  //       console.log('peter big size ' + fileReader.result);
  //       // down line crash when file very big size
  //       let content = CryptoJS.lib.WordArray.create(fileReader.result);
  //       let decrypted = CryptoJS.AES.encrypt(content, key, {
  //           mode: CryptoJS.mode.ECB,
  //           padding: CryptoJS.pad.Pkcs7
  //       });
  //       const result = convertWordArrayToUint8Array(decrypted.ciphertext);
  //       let fileDecBlob = new Blob([result]);
  //       callback(fileDecBlob, result);
  //   } catch (e) {
  //       console.log("peter fail", e);
  //   }
  // };
}

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log(originalText); // 'my message'

test();