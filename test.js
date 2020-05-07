let board = [
    [{symbol: 0}, {symbol: 0},{symbol: 0}],
    [{symbol: 0},{symbol: 0},{symbol: "a"}],
    [{symbol: 0},{symbol: 0},{symbol: "b"}]
]
let newBoard = board.filter(row=>{
    let newRow = row.filter(el=>el.symbol==="a");
    if(newRow.length>0){
        return newRow;
    }
  
});
console.log(newBoard)
console.log("")