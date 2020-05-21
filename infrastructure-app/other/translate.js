const AWS = require("aws-sdk");
const translate = new AWS.Translate();
    
exports.handler = (event, context, callback) => {
    var params = {
            SourceLanguageCode: event.lang,
            TargetLanguageCode: 'en',
            Text: event.text
    };
          
    translate.translateText(params, function(err, data) {
         if (err) callback(null, {error: err });
        else callback(null, {engText: data, lang: event.lang, text: event.text })
    })
};