'use strict'
let TileFactory = require("./tilefactory");
let utils = require("./utils");

module.exports = class Board{
    constructor(sizeX, sizeY){
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.board=[];
        this.solution=[];
        this.players = [];
        this.rounds=0;
       
    }

    createBoard(){
        for(let i=0; i<this.sizeX; i++){
            this.board.push(new Array(this.sizeY));
            this.solution.push(new Array(this.sizeY));
            for(let j=0; j<this.sizeY; j++){
                this.board[i][j] = {symbol:0, checked: false, x:i, y:j};
                this.solution[i][j] = 0;
                }
            }
   
    }

    fillBoard(){
        let tileFactory = new TileFactory();
        while(this.solution.some(row=>row.includes(0))){
            let tile = tileFactory.createTile();
            this.placeTheTile(tile.symbol);
            this.placeTheTile(tile.symbol);
           
        }
    }
    getRandomX(){
        return utils.randomizeNumber(this.sizeX);
    }
    getRandomY(){
        return utils.randomizeNumber(this.sizeY);
    }
    placeTheTile(tile){
        let x = this.getRandomX();
        let y = this.getRandomY();
        if(this.solution[x][y]===0){
            this.solution[x][y]={symbol:tile, checked:false, x: x, y: y};
        }else{
            while(this.solution[x][y]!==0){
                x=this.getRandomX();
                y=this.getRandomY();
            }
            this.solution[x][y]={symbol:tile, checked:false, x: x, y: y};
        }
    }

    checkTheTiles(player){
        //wylosuj najpierw jeden klocek i sprawdź ze swoją tablicą, czy jest podobny, a później drugi 
        //jeśli oba się zgadzają to przekaż reszcie dwa wylosowane klocki do ich tablic
        let msg="";
        let playerBoard = player.getNonCheckedTiles();
        let nonEmptyBoard = this.board.map(row=>row.filter(el=>el.checked===false));
        if(playerBoard.every(e=>e===0)){
            console.log("Player", player.id, "has won with revealed tiles:", player.solutions)
            console.log("Player board:");
            console.table(player.board);
        }
        else{
            let x1=this.getRandomX(nonEmptyBoard[0].length);
            let y1=this.getRandomY(nonEmptyBoard.length);
            let tile1 = this.solution[x1][y1];
        
            player.setTheTile(tile1);
            let x2=this.getRandomX(nonEmptyBoard[0].length);
            let y2=this.getRandomY(nonEmptyBoard.length);
            let tile2 = this.solution[x2][y2];
            
            player.setTheTile(tile2);
            this.rounds++;
            msg = "Round "+ this.rounds+": Player "+player.id+" has revealed: " +tile1.symbol+" and "+tile2.symbol;
            if(tile1.symbol===tile2.symbol){
                tile1.checked = true;
                tile2.checked = true;
                this.revealTwoCorrectTiles(tile1, tile2);
                player.writeTheSolution({tile1, tile2});
            }
        }
        
        console.log(msg);
    }
    revealTwoCorrectTiles(tile1, tile2){
            this.players.forEach(player=>{
                player.board.filter(el=>{
                    if(el.symbol===tile1.symbol){
                        el.x=tile1.x;
                        el.y=tile1.y;
                        el.checked = tile1.checked;
                    }
                    if(el.symbol===tile2.symbol){
                        el.x=tile2.x;
                        el.y=tile2.y;
                        el.checked=tile2.checked;
                    }
                })
            })
    }

    registerPlayer(player){
        if(this.players.indexOf(player)===-1){
            this.players.push(player);
            player.board = this.board;
        }
        
    }
    checkIfBoardIsEmpty(){
        let result = [];
        for(let row of this.board){
            for(let item of row){
                if(item.checked===false){
                    result.push(item);
                }
            }
        }
       
      return result.length===0?true:false;
    }
}