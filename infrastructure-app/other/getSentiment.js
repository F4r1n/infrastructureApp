const AWS = require("aws-sdk");
var comprehend = new AWS.Comprehend();
    
exports.handler = (event, context, callback) => {
    comprehend.detectSentiment({ LanguageCode: event.lang, Text: event.text }, function (
        err, data) {
            if (err) callback(null, {error: err });
            else callback(null, {sentiment: data, lang: event.lang, text: event.text })
        })
};
