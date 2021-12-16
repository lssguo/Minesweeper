function GameSetting(PaneRows,PaneCols,grid) {
    let boardSet = document.querySelector("#board") ;
    for (let x = 0; x < PaneRows; x++) {
        let trSet = document.createElement("tr") ;
        for (let y = 0; y < PaneCols; y++) {
            let tdSet = document.createElement("td") ;
            let SquareEl = document.createElement("div") ;
            SquareEl.className = "Square" ;
            grid[x][y].SquareEl = SquareEl;

            SquareEl.addEventListener("click", (e)=> {
                if (grid[x][y].count === -1) {
                   boom(grid, x, y, PaneRows, PaneCols)
                   alert("boom!")
                    return;
                }

                if (grid[x][y].count === 0) {
                    OpenSpacse(grid, x, y, PaneRows, PaneCols)
                }
                else if (grid[x][y].count > 0) {
                    grid[x][y].clear = true;
                    SquareEl.classList.add("clear");
                    grid[x][y].SquareEl.innerText = grid[x][y].count;
                }

                allcleared(grid);
            });
            
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

function initialize(PaneRows, PaneCols, MinesNum) {
    let pane = new Array(PaneRows) ;
    for (let x = 0; x < PaneRows; x++) {
        pane[x] = new Array(PaneCols);
        for (let y = 0; y < PaneCols; y++){
            pane[x][y] = {
                clear: false,
                count: 0
            };
        }
    }

    let mines = [] ;
    for (let i = 0; i < MinesNum; i++) {
        let row = Math.trunc(Math.random() * PaneRows) ;
        let col = Math.trunc(Math.random() * PaneCols) ;

        if (pane[row][col].count != -1){
            pane[row][col].count = -1 ;
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
            if (NeighRow < 0 || NeighRow >= PaneRows || NeighCol < 0 || NeighCol >= PaneCols) {
                continue;
            }
            
            if (pane[NeighRow][NeighCol].count === -1) {
                continue;
            }
            else {
                pane[NeighRow][NeighCol].count += 1;
            }
        }
    }
    return pane;
}

function boom(grid, x, y, PaneRows, PaneCols) {
    grid[x][y].SquareEl.classList.add("boom");

    for (let BoxRow = 0; BoxRow < PaneRows; BoxRow++) {
        for (let BoxCols = 0; BoxCols < PaneCols; BoxCols++) {
            let eachbox = grid[BoxRow][BoxCols];
            eachbox.clear = true;

            eachbox.SquareEl.classList.add("clear");

            if (eachbox.count >0) {
            eachbox.SquareEl.innerText = eachbox.count;
            }
            if (eachbox.count === -1) {
                eachbox.SquareEl.classList.add("Unfound");
            }
        }
    }
}

function OpenSpacse(grid, x, y, PaneRows, PaneCols) {
    let zeroZone = grid[x][y];
    zeroZone.clear = true;
    zeroZone.SquareEl.classList.add("clear");

    for (let [RRow, RCol] of round) {
        let ZeroRow = x + RRow;
        let ZeroCol = y + RCol;
        
        if (ZeroRow < 0 || ZeroRow >= PaneRows || ZeroCol < 0 || ZeroCol >= PaneCols) {
            continue;
        }

        let ZeroRound = grid[ZeroRow][ZeroCol];
        if (!ZeroRound.clear) {
            ZeroRound.clear = true;
            ZeroRound.SquareEl.classList.add("clear");
            if (ZeroRound.count === 0) {
                OpenSpacse(grid, ZeroRow, ZeroCol, PaneRows, PaneCols)
            }
            else if (ZeroRound.count > 0) {
                ZeroRound.SquareEl.innerText = ZeroRound.count;
            }
        }
    }
}

function allcleared(grid) {

    for (let panerow = 0; panerow < grid.length; panerow ++) {
        for (let panecol = 0; panecol < grid.length; panecol ++) {
            let cell = grid[panerow][panecol];

            if (cell.count !== -1 && !cell.clear){
                return false;
            }
        }
    }

    for (let panerow = 0; panerow < grid.length; panerow ++) {
        for (let panecol = 0; panecol < grid.length; panecol ++) {
            let cell = grid[panerow][panecol];
            if (cell.count === -1) {
                cell.SquareEl.classList.add("Unfound");
            }
        }
    }

    return true;
}

let grid = initialize(9,9,9);

GameSetting(9,9,grid);