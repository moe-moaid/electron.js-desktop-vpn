const CryptoJS = require("crypto-js");

function decryptData(encryptedData) {
  const decodedData = CryptoJS.enc.Base64.parse(encryptedData).toString(
    CryptoJS.enc.Utf8
  );
  const dataObj = JSON.parse(decodedData);
  const key = "aNdRgUkXp2s5v8y/B?E(G+KbPeShVmYq";
  const iv = dataObj.iv;

  const decrypted = CryptoJS.AES.decrypt(dataObj.value, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });


  // Convert the decrypted data to a Utf8 string
  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

  return decryptedText;
}

module.exports = { decryptData };
