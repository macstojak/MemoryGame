
function randomizeNumber(number){
    
    let n = Math.floor(Math.random()*(number));
    return n;
}
module.exports = {randomizeNumber:randomizeNumber};