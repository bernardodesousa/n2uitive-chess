const chess = require('./chess');

test('Trying to setup a game with insuficient number of players throws error', () => {
    const game = new chess.Game();
    game.addBoard(new chess.Board());

    expect(game.setupGame).toThrow(Error);
});

test('Trying to add a third player throws error', () => {
    const game = new chess.Game();
    game.addBoard(new chess.Board());

    game.addPlayer(new chess.Player("Tom"));
    game.addPlayer(new chess.Player("Frederic"));

    expect(() => {
        game.addPlayer(new chess.Player("Pedro"));
    }).toThrow(Error);
});

test('Check that moving pawn sideways isn`t valid', () => {
    const game = new chess.Game();
    game.addBoard(new chess.Board());

    game.addPlayer(new chess.Player("Tom"));
    game.addPlayer(new chess.Player("Frederic"));
    game.setupGame();

    let e2Pawn = game.board.squares[4][1];
    let destination = new chess.Location(3, 1);
    let movement = new chess.Movement(e2Pawn, destination);
    
    expect(e2Pawn.isValidMovement(movement)).toBe(false);
});

test('Check that moving pawn 3 squares ahead isn`t valid', () => {
    const game = new chess.Game();
    game.addBoard(new chess.Board());

    game.addPlayer(new chess.Player("Tom"));
    game.addPlayer(new chess.Player("Frederic"));
    game.setupGame();

    let e2Pawn = game.board.squares[4][1];
    let destination = new chess.Location(4, 4);
    let movement = new chess.Movement(e2Pawn, destination);
    
    expect(e2Pawn.isValidMovement(movement)).toBe(false);
});

test('Check that moving pawn 1 square ahead is valid', () => {
    const game = new chess.Game();
    game.addBoard(new chess.Board());

    game.addPlayer(new chess.Player("Tom"));
    game.addPlayer(new chess.Player("Frederic"));
    game.setupGame();

    let e2Pawn = game.board.squares[4][1];
    let destination = new chess.Location(4, 2);
    let movement = new chess.Movement(e2Pawn, destination);
    
    expect(e2Pawn.isValidMovement(movement)).toBe(true);
});
