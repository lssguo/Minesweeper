function GameSetting(PaneRows,PaneCols,grid) {
    let boardSet = document.querySelector("#board") ;
    for (let x = 0; x < PaneRows; x++) {
        let trSet = document.createElement("tr") ;
        for (let y = 0; y < PaneCols; y++) {
            let tdSet = document.createElement("td") ;
            let SquareEl = document.createElement("div") ;
            SquareEl.className = "Square" ;
            SquareEl.innerText = grid[x][y] ;
            tdSet.append(SquareEl) ;
            trSet.append(tdSet) ;
        }

        boardSet.append(trSet) ;
    }
}

function initialize(Rows, Cols, MinesNum) {
    let pane = new Array(Rows) ;
    for (let x = 0; x < Rows; x++) {
        pane[x] = new Array(Cols);
        for (let y = 0; y < Cols; y++){
            pane[x][y] = 0;
        }
    }
    return pane;
    

}


let grid = initialize(9,9);

GameSetting(9,9,grid);