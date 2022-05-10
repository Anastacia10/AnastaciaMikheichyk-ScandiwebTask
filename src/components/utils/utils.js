export const calculateTotalPrices = (sign="plus", prevTotalPrices, mutatedPrices) =>{
    let keys = Object.keys(prevTotalPrices);
    if(sign === "plus"){
        return keys.reduce((acc, key) =>{
            return {...acc, [key]: +(prevTotalPrices[key] + mutatedPrices[key]).toFixed(2)}
        },{})
    }else if(sign === "minus"){
        return keys.reduce((acc, key) =>{
            return {...acc, [key]: +(prevTotalPrices[key] - mutatedPrices[key]).toFixed(2)}
        },{})
    }
}

export const calculateTotalPricesWithTax = (totalPrices, taxPercent) =>{
    let totalPricesAfterTax = {};
    let taxes = {}
    for (const key in totalPrices) {
        const value = totalPrices[key];
        const tax = +((Math.round(value * taxPercent))/100).toFixed(2);
        const priceWithTax = +(tax + totalPrices[key]).toFixed(2);
        taxes[key] = tax;
        totalPricesAfterTax[key] = priceWithTax;
    }
    return {taxes, totalPricesAfterTax};
}
