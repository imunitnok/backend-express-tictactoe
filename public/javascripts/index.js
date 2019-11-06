"use strict";

//import {GameTicTacToe} from "./gameui";

let startGame = function() {
    let body = document.getElementsByTagName("body")[0];
    body.style.height = window.innerHeight + "px";

    let board = document.getElementById("board");
    board.style.height = body.offsetHeight + "px";

//    let table = board.getElementsByClassName("table")[0];
//    let progress = board.getElementsByClassName("progress-bar")[0].firstElementChild;

//    let tableContainer = board.getElementsByClassName("table-container")[0];
//    tableContainer.style.height = body.offsetHeight + "px";

    let crutch = board.getElementsByClassName("crutch")[0];
    crutch.style.height = body.offsetHeight + "px";

    board.addEventListener("mousedown", (ev) => {
        let el = ev.target.parentNode.parentNode;
        if(el.localName == "td") {
            let tr = el.parentNode;
            let row = tr.rowIndex;
            let column = el.cellIndex;
            let xhr = new XMLHttpRequest();
            xhr.open("POST", window.location.href);
            let json = JSON.stringify({
                row: row,
                col: column
              });
              xhr.open("POST", '/')
              xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
              xhr.send(json);

              xhr.onload = () => {window.location.href = '/'};
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