
function randomizeNumber(number){
    
    let n = Math.floor(Math.random()*(number));
    return n;
}
function checkLastElementInMultiArray(array){
    let count = 0;
    let lastTile;
    for(row of array){
        if(row.length===1){
            count++;
            lastTile=row[0];
        }
    }
    return count===1 ?  lastTile :  count;
    
}
module.exports = {
    randomizeNumber:randomizeNumber,
    checkLastElementInMultiArray: checkLastElementInMultiArray
};