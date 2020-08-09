module.exports = (templateToFill, dataToBeAdded) => {
    let filledTemplate = templateToFill;
    filledTemplate = filledTemplate.replace(/{%PRODUCTNAME%}/g, dataToBeAdded.productName);
    filledTemplate = filledTemplate.replace(/{%IMAGE%}/g, dataToBeAdded.image);
    filledTemplate = filledTemplate.replace(/{%FROM%}/g, dataToBeAdded.from);
    filledTemplate = filledTemplate.replace(/{%NUTRIENTS%}/g, dataToBeAdded.nutrients);
    filledTemplate = filledTemplate.replace(/{%QUANTITY%}/g, dataToBeAdded.quantity);
    filledTemplate = filledTemplate.replace(/{%PRICE%}/g, dataToBeAdded.price);
    filledTemplate = filledTemplate.replace(/{%DESCRIPTION%}/g, dataToBeAdded.description);
    filledTemplate = (dataToBeAdded.organic) ? filledTemplate.replace(/{%NOT_ORGANIC%}/g, ``) : filledTemplate.replace(/{%NOT_ORGANIC%}/g, `not-organic`);
    return filledTemplate;
}