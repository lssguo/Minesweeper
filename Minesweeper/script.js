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

const round = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, 1], [1, 1], [1, 0],
    [1, -1], [0, -1]
]

function initialize(Rows, Cols, MinesNum) {
    let pane = new Array(Rows) ;
    for (let x = 0; x < Rows; x++) {
        pane[x] = new Array(Cols);
        for (let y = 0; y < Cols; y++){
            pane[x][y] = 0
        }
    }

    let mines = [] ;
    for (let i = 0; i < MinesNum; i++) {
        let row = Math.trunc(Math.random() * Rows) ;
        let col = Math.trunc(Math.random() * Cols) ;

        if (pane[row][col] != -1){
            pane[row][col] = -1 ;
            mines.push([row, col]) ;
        }
        else {
            i -= 1;
        }
    }
    console.log(mines);

    for (let [row,col] of mines) {
        for ( let [RRow, RCol] of round) {
            let NeighRow = row + RRow;
            let NeighCol = col + RCol;
            if (NeighRow < 0 || NeighRow >= Rows || NeighCol < 0 || NeighCol >= Cols) {
                continue;
            }
            
            if (pane[NeighRow][NeighCol] === -1) {
                continue;
            }
            else {
                pane[NeighRow][NeighCol] += 1;
            }
        }
    }
    return pane;
}



let grid = initialize(9,9,9);

GameSetting(9,9,grid);