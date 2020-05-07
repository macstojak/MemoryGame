//Player 
// - musi obserwować tablicę i sprawdzać czy są już jakies odkryte pola,a
// -  sprawdza podczas jednego ruchu dwa pola, czy są takie same i czy w pamięci ma podobne i zapamiętuje co było na danej pozycji

module.exports = class Player{
    constructor(id){
        this.id = id;
        this.board = null;
        this.solutions=[];
    }

    getNonCheckedTiles(){
        let result = this.board.filter(row=>row.filter(el=>el=0));
        if(result.length===0){
            return 0;
        }else{
            return this.board.map(row=>row.filter(el=>el.checked===false));
        }
    }
    searchForSecondTile(tile){
        let result=[];
        // this.board.map(row=>row.filter(t=>t.symbol===tile.symbol));
        for(let row in this.board){
            for(let element in row){
                if(element.symbol===tile.symbol){
                    result.push(element);
                }
            }
        }
        return result;
    }
    setTheTile(tile){
        let searchedTile = this.searchForSecondTile(tile);
        if(searchedTile.length===0){
            tile.checked=true;
            this.board[tile.x][tile.y] = tile;
        }else{
            this.solutions.push({tile,searchedTile})
        }
    }

    writeTheSolution(solutions){
        this.solutions.push(solutions);
    }

}   