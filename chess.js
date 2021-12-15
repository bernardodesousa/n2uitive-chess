// Please flesh out the following tests. Feel free to add any properties/functions 
// you feel are necessary for the implementation. Don't spend more than an hour on it.
// Send me a javascript file that can be used to run the tests and demonstrate that 
// they work. I'm not specifically looking for the details of Pawn piece movement, so 
// much as your thinking around the interfaces we've set up here.

// THE TEST CASES:
//
// DONE 1. As a 3rd player, when I try to join the game, I receive an error.
// 2. As the white player, when I try to move a black piece, I receive an error.
// DONE 3. As a player, when I move a pawn to an invalid board location according 
// 		to the rules for _pawns_, I receive an error

const WHITE = 0;
const BLACK = 1;

class Game {
    board;
    white;
    black;

    addBoard(board) {
        this.board = board;
    }

    setupGame() {
        if (!this.white || !this.black) {
            throw new Error("Can`t setup game with insuficient number of players.");
        }

        // setup white pieces
        this.board.squares[0][0] = new Rook(WHITE, new Location(0, 0));
        this.board.squares[7][0] = new Rook(WHITE, new Location(7, 0));
        this.board.squares[1][0] = new Knight(WHITE, new Location(1, 0));
        this.board.squares[6][0] = new Knight(WHITE, new Location(6, 0));
        this.board.squares[2][0] = new Bishop(WHITE, new Location(2, 0));
        this.board.squares[5][0] = new Bishop(WHITE, new Location(5, 0));
        this.board.squares[3][0] = new Queen(WHITE, new Location(3, 0));
        this.board.squares[4][0] = new King(WHITE, new Location(4, 0));
        
        // setup black pieces
        this.board.squares[0][7] = new Rook(BLACK, new Location(0, 7));
        this.board.squares[7][7] = new Rook(BLACK, new Location(7, 7));
        this.board.squares[1][7] = new Knight(BLACK, new Location(1, 7));
        this.board.squares[6][7] = new Knight(BLACK, new Location(6, 7));
        this.board.squares[2][7] = new Bishop(BLACK, new Location(2, 7));
        this.board.squares[5][7] = new Bishop(BLACK, new Location(5, 7));
        this.board.squares[3][7] = new Queen(BLACK, new Location(3, 7));
        this.board.squares[4][7] = new King(BLACK, new Location(4, 7));

        // setup pawns
        for (let i=0; i<8; i++) {
            this.board.squares[i][1] = new Pawn(WHITE, new Location(i, 1));
            this.board.squares[i][6] = new Pawn(BLACK, new Location(i, 6));
        }
    }

    addPlayer(player) {
        if (!this.white) {
            this.white = player;
            return;
        } else if (!this.black) {
            this.black = player;
            return;
        }

        throw new Error("Can`t add more than 2 players.");
    }

    move(player, movement) { }
}

class Board {
    squares = [];
    
    constructor() {
        for (let i=0; i<8; i++) {
            this.squares[i] = Array(8).fill(null);
        }
    }
}

class Player {
    name;

    constructor(name) {
        this.name = name;
    }
}

class Piece {
    color;
    location;

    constructor(color, location) {
        this.color = color;
        this.location = location;
    }

    isValidMovement(movement) { }
}

class Pawn extends Piece {
    constructor(color, location) {
        super(color, location);
    }

    isValidMovement(movement) {
        if (movement.destination.file != this.location.file) {
            // can`t move sideways
            return false;
        }

        if (this.color == WHITE) {
            if (this.location.row == 1) {
                // can move 1 or 2 squares up
                if (movement.destination.row == this.location.row + 1) return true;
                if (movement.destination.row == this.location.row + 2) return true;
            } else {
                // can move 1 square up
                if (movement.destination.row == this.location.row + 2) return true;
            }
        } else if (this.color == BLACK) {
            if (this.location.row == 6) {
                // can move 1 or 2 squares down
                if (movement.destination.row == this.location.row - 1) return true;
                if (movement.destination.row == this.location.row - 2) return true;
            } else {
                // can move 1 square down
                if (movement.destination.row == this.location.row - 2) return true;
            }
        }

        return false;
    }
}

class Rook extends Piece { }
class Knight extends Piece { }
class Bishop extends Piece { }
class Queen extends Piece { }
class King extends Piece { }

class Location {
    row;
    file;

    constructor(file, row) {
        this.file = file;
        this.row = row;
    }

    get row() {
        return this.row;
    }

    get file() {
        return this.file;
    }
}

class Movement {
    piece;
    destination;

    constructor(piece, destination) {
        this.piece = piece;
        this.destination = destination;
    }

    get piece() {
        return this.piece;
    }
    
    get destination() {
        return this.destination;
    }
}

// example...
const game = new Game()

const board = new Board()
game.addBoard(board)

const p1 = new Player()
game.addPlayer(p1)

const p2 = new Player()
game.addPlayer(p2)

game.move(p1, new Movement(
    // game.white.pieces.kingside.kingPawn,
    // board.locations.e4
))

module.exports = { Game, Board, Location, Movement, Piece, Player };
