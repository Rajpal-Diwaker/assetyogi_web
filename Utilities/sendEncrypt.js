
const cryptLib = require('@skavinvarnan/cryptlib');
const key = 'finlock@2021'

module.exports = {
    "SEND": function (response) {
        let text = JSON.stringify(response);
        const cipherText = cryptLib.encryptPlainTextWithRandomIV(text, key);
        let str = {
            code: 200,
            data: cipherText
        }
        // return str;
        return response;
    },
    "GET": function (response) {
        let text = JSON.stringify(response);
        const decryptedString = cryptLib.decryptCipherTextWithRandomIV(cipherText, key);
        return decryptedString;
    }
}
