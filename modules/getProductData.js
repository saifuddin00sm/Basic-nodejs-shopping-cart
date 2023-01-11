module.exports = (html, data)=> {
    let output = html.replace(/{%ITEMNAME%}/g, data.productName);
    output = output.replace(/{%ITEMPRICE%}/g, data.price);
    output = output.replace(/{%ITEMDESC%}/g, data.description);
    output = output.replace(/{%ITEMIMG%}/g, data.image);
    output = output.replace(/{%ID%}/g, data.id);
    if(!data.isAvailable) output = output.replace(/{%NOT_AVAILABLE%}/g, 'not_available');
    return output;
}