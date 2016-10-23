const Player = require('./player.js');
const Board = require('./board.js');
const readline = require('readline');
var prompt = require('prompt-sync') ({
 autocomplete: null,
});
 
var player1 = new Player("Player 1");
var player2 = new Player("Player 2");
var currentPlayer = player1;

console.log("Player1, time to place your ships!");
getInput(player1.ships.aircraftCarrier, "aircraft carrier", player1);
getInput(player1.ships.submarine, "submarine", player1);
// console.log(player1.board.cells)
// getInput(player1.ships.battleship, "battleship", player1);
// getInput(player1.ships.patrolBoat, "patrol boat", player1);
console.log("Player2, time to place your ships!");
getInput(player2.ships.aircraftCarrier, "aircraft carrier", player2);
getInput(player2.ships.submarine, "submarine", player2);
// console.log(player2.board.cells)
// getInput(player2.ships.battleship, "battleship", player2);
// getInput(player2.ships.patrolBoat, "patrol boat", player2);

function getInput(ship, shipName, player) {
  var letter = shipName[0];
  var pair1 = prompt(`Place your ${shipName}, start position`)
  var pair2 = prompt(`Place your ${shipName}, end position`)
  while (!validCoords(pair1, pair2, player, ship)) {
    var pair1 = prompt(`Place your ${shipName}, start position`)
    var pair2 = prompt(`Place your ${shipName}, end position`)
  }
  player.board.placeShip(ship, [pair1, pair2], letter);
}

function validCoords(p1, p2, player, ship) {
  var x1 = parseInt(p1[1])
  var y1 = parseInt(p1[3])
  var x2 = parseInt(p2[1])
  var y2 = parseInt(p2[3])

// Ensure coordinates in bounds.
  if (x1 < 0 || x2 < 0 || y1 < 0 || y2 < 0) {
    console.log("Coordinates out of bounds");
    return false;
  }

  if (x1 > 6 || x2 > 6 || y1 > 6 || y2 > 6) {
    console.log("Coordinates out of bounds");
    return false; 
  }

// If both x coords are the same, then the y coords must be different, IE, no diagonal ships.
  // if ( !(( (x1 != x2) && (y1 === y2) ) || ( (x1 === x2) && (y1 != y2) )) ) {
  //   console.log("Ships cannot be placed diagonally.");
  //   return false;

  // } 

// Ensure space isn't already populated
  // if (x1 != x2) { 
  //   var len = Math.abs(x1 - y1);
    
  //   for (var i = x1; i < len; i++) {
  //     if (player.board.cells[i][y1] != '~') {
  //       console.log("A ship already exists there.");
  //       return false;
  //     }
  //   }

// Ensure the distance between the two coordinates is big enough to fit the whole ship.
  //   if ( Math.abs( x1 -x2 != ship.length) ) {
  //     console.log("Space is too small to fit ship.");
  //     return false;
  //   }

  // } else {
  //   var len = Math.abs(y1 - y2);
    
  //   for (var i = y1; i < len; i++) {
  //     if (player.board.cells[x1][i] != '~') {
  //       console.log("A ship alredy exists there.");
  //       return false;
  //     }
  //   }

  //   if ( Math.abs(y1 - y2) != ship.length) {
  //     console.log("Space is too small or too large to fit ship.");
  //     return false;
  //   }

  // }

  return true;
}

function getAttackCoords() {
  return prompt('Enter attack target ([x,y])');
}

function oppositePlayer() {
  var other = (currentPlayer === player1 ? player2 : player1);
  return other;
}

function playGame() {
  while (!currentPlayer.lost()) {
    console.log(`${currentPlayer.name}, it's your turn!`)
    console.log("Your opponent's board:")
    console.log(oppositePlayer().board.obfuscateBoard());
    var attackCoords = getAttackCoords();
    oppositePlayer().board.hit(attackCoords, oppositePlayer());
    currentPlayer = oppositePlayer();
  }
  console.log (`${currentPlayer().name} loses!`)
}

playGame();