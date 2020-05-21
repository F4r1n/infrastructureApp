exports.handler =  async (event) => {
    return {"translateInput": event.getLanguageOutput}
};