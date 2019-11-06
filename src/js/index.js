"use strict";

import {GameTicTacToe} from "./gameui";

let startGame = function() {
    let body = document.getElementsByTagName("body")[0];
    body.style.height = window.innerHeight + "px";

    let board = document.getElementById("board");

    let table = board.getElementsByClassName("table")[0];
    let progress = board.getElementsByClassName("progress-bar")[0].firstElementChild;

    let tableContainer = board.getElementsByClassName("table-container")[0];
    tableContainer.style.height = body.offsetHeight + "px";

    let crutch = board.getElementsByClassName("crutch")[0];
    crutch.style.height = body.offsetHeight + "px";
    
    let game = new GameTicTacToe(table, document.createElement.bind(document), progress);

    game.showField();

    board.addEventListener("mousedown", (ev) => {
        let el = ev.target.parentNode;
        if(el.localName == "td") {
            let tr = el.parentNode;
            let row = tr.rowIndex;
            let column = el.cellIndex;
            if(game.board.turn(row + 1, column + 1))
                game.showField();
        }
        ev.stopPropagation();
    });

    document.removeEventListener("DOMContentLoaded", startGame);
}

if(document.readyState !== "lading") {
    startGame();
} else {
    document.addEventListener("DOMContentLoaded", startGame);
}