const randomBytes = require("crypto").randomBytes;
const AWS = require("aws-sdk");

exports.handler = (event, context, callback) => {
    let id = toUrlString(randomBytes(16))
    
    var params = {
      TableName : 'Comprehend',
      Item: {
        ID: id,
        User: "Jonas",
        text: event[0].getSentimentOutput.text,
        engText: event[1].translateOutput.engText.TranslatedText,
        sourceLang: event[0].getSentimentOutput.lang,
        sentiment: event[0].getSentimentOutput.sentiment,
        RequestTime: new Date().toISOString(),
      }
    };
    
    var documentClient = new AWS.DynamoDB.DocumentClient();
    
    documentClient.put(params, function(err, data) {
        if (err) callback(null, { error: err });
        else callback(null, {status: "ok"})   
    });
};

function toUrlString(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}