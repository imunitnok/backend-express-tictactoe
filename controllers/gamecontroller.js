var Game = require('../models/game');

let renderGame = async (res, game, next) => {
    await game.save((err) => {
        if (err) { return next(err); }
        res.render('game', { 
            size: game.size,
            board: game.board,
            current: game.cur_player,
        });
    });
}

let newGame = (req) => {
    return new Game(
        {
            pl_number: 2,
            cur_player: 1,
            size: { width: 5, height: 5 },
            name: 'req.cookies.cookieName',
            board: Array(5).fill(Array(5).fill(0)),
            gameover: 0,
            moves: []
        });
}

let findGame = (req, callback) => {
    Game.findOne({'name': 'req.cookies.cookieName'}).exec((err, game) => {
        if(err) return next(err);
        if (game === null) {
            callback(newGame(req));
        } else callback(game);
    });
}

let clearData = (req, callback) => {
    findGame(req, (game) => {
        game.board = Array(5).fill(Array(5).fill(0));
        game.gameover = 0;
        game.cur_player = 1;
        game.moves = [];
        game.markModified('board');
        game.markModified('moves');
        game.save((err) => {callback()});
    });
}

exports.getapp = (req, res, next) => {
    res.render('game');
};

exports.getgame = (req, res, next) => {
    findGame(req, (game) => {
        res.json({moves: game.moves, gameover: game.gameover, player: game.cur_player});
    });
}

exports.newgame = (req, res, next) => {
    clearData(req, (err) => {
        if (err) { return next(err) }
        res.redirect('/');
    });
}

let checkTurn = (row, col, moves) => {
    for (let move of moves) {
        if (row === move.row && col === move.col) return false;
    }
    return true;
}

exports.move = (req, res, next) => {
    findGame(req, (game) => {
        let row = req.body.row;
        let col = req.body.col;
        // if (-1 < row < game.size.width
        //     && -1 < col < game.size.height) {
        //     if (game.board[row][col] === 0) {
        //         game.board[row][col] = game.cur_player;
        if(!game.gameover && game.cur_player == req.body.pl && checkTurn(row, col, game.moves)) {
                game.moves.push({ row: row, col: col, pl: game.cur_player });
                game.cur_player = game.cur_player % game.pl_number + 1;
                game.gameover = req.body.go;
                game.markModified('board');
                game.save((err) => {
                    if (err) { return next(err); }
                });
                res.status(200);
                res.send("Move was successful. Awaiting next move.");
        } else {
            res.status(500);
            res.send("Something went wrong. Resync!");
        }
        //     } else {
        //         res.status(500);
        //         res.send('Wrong place for another step');
        //     };
        // } else {
        //     res.status(500);
        //     res.send('Move out of bounds');
        // };
    });
    console.log(req.body);
}