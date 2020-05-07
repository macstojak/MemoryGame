let Tile = require("./tile");
let utils = require("./utils");
module.exports = class TileFactory{
    constructor(){
       this.symbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k","l", "m", "n", "o", "p"] 
    }
    createTile(){
        let randomIndex = utils.randomizeNumber(this.symbols.length);
        let tile = new Tile(this.symbols[randomIndex]);
        this.symbols.splice(randomIndex,1);
        return tile;
    }
  
}