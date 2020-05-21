exports.handler =  async (event) => {
    return {"getSentimentInput": event.getLanguageOutput};
};