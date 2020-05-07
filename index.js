let Board = require("./board");
let Player = require("./player");
let players = [];
//pobieramy rozmiar tablicy i ustalamy ile graczy gra
let sizeX = 3;
let sizeY = 4;
let numberOfPlayers = 2;
let memoryBoard;
//sprawdzamy czy będzie parzysta liczba puzzli
let checkIfEven = (x, y) => {
  return (x * y) % 2 === 0 ? true : false;
};
let checkIfPlayersExist = (num) => {
  return num >= 2 && num <= 4 ? true : false;
};
let isBoardValid = checkIfEven(sizeX, sizeY) && checkIfPlayersExist(numberOfPlayers);

if (isBoardValid) {
  memoryBoard = new Board(sizeX, sizeY);

  //tworzymy tablicę okienek o określonym rozmiarze
  memoryBoard.createBoard();
  //tworzymy użytkowników i przekazujemy im pustą tablicę
  for (let i = 0; i < numberOfPlayers; i++) {
    let player = new Player(i);
    memoryBoard.registerPlayer(player);
    players.push(player);
  }
  //ustawiamy płytki na tablicy
  memoryBoard.fillBoard();
  console.table(memoryBoard.solution)
  //odgadywanie pól do momentu aż któryś zgadnie wszystkie pola;

  while (memoryBoard.checkIfBoardIsEmpty()===false) {
    players.forEach((player) => {
      //sprawdź dwie różne płytki na tablicy i porównaj ze swoją tablicą
      console.log("Player", player.id, "turn:");
      memoryBoard.checkTheTiles(player);
    });
  }
}

// let start={x:1, y:1};
// let coordinates={x:1, y:1};
// let newTreasure = new Treasure();
// newTreasure.searchForTile(newTreasure.getTileCoordinates())
