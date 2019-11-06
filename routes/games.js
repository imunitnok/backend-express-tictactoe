var express = require('express');
var router = express.Router();

var gameCtl = require('../controllers/gamecontroller');

/* GET games listing. */
router.get('/', gameCtl.getapp);

router.get('/gamestate', gameCtl.getgame);

/* POST crate new game. */
router.post('/newgame', gameCtl.newgame);

/* */
router.post('/', gameCtl.move);

module.exports = router;
