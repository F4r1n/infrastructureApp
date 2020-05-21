const AWS = require("aws-sdk");
var comprehend = new AWS.Comprehend();
    
exports.handler = (event, context, callback) => {

    let text = event.text;
    
    var params = {
      Text: text,
    };
    return comprehend.detectDominantLanguage(params, function (
        err,
        data
      ) {
        if (err) callback(null, { error: err });
        else callback(null, {lang: data["Languages"][0]["LanguageCode"], text: text })
      })
}
