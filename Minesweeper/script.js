let warnning = confirm("该游戏只允许有扫雷经验的人玩！（我说的。）")
alert(warnning);
if (!warnning) {
        location.reload();
}
function GameSetting(PaneRows,PaneCols,grid) {
    let boardSet = document.querySelector("#board") ;
    let minecount = document.querySelector("#MineNum");
    let num = 0;
    let temp = [];
    let putposi = [];
    let putnum = [];
    window.oncontextmenu = function(e) {
        return false;
    }
    for (let x = 0; x < PaneRows; x++) {
        let trSet = document.createElement("tr") ;
        for (let y = 0; y < PaneCols; y++) {
            let tdSet = document.createElement("td") ;
            let SquareEl = document.createElement("div") ;
            SquareEl.className = "Square" ;
            grid[x][y].SquareEl = SquareEl;
            if (grid[x][y].count === -1) {
                    num += 1;
                }

            SquareEl.addEventListener("click", (e)=> {
                if (grid[x][y].count === -1 ) {
                   boom(grid, x, y, PaneRows, PaneCols);
                   alert("接着练练吧！");
                    return;
                }

                if (grid[x][y].count === 0) {
                    OpenSpacse(grid, x, y, PaneRows, PaneCols);
                }
                else if (grid[x][y].count > 0) {
                    grid[x][y].clear = true;
                    SquareEl.classList.add("clear");
                    grid[x][y].SquareEl.innerText = grid[x][y].count;
                }

                allcleared(grid);
                checkwin();
            });
            
            SquareEl.addEventListener("contextmenu", (e)=> {
                if (!grid[x][y].clear) {
                SquareEl.classList.toggle("mark");
            }

                 
            for (let a = 0; a < PaneRows * PaneCols; a++) {
                if ( !temp.includes(grid[x][y]) ) {
                    if (grid[x][y].count == -1) {
                        grid[x][y].count = -2;
                        temp.push(grid[x][y]);
                        break;
                    }else if ( grid[x][y].count > -1) {
                        putposi.push([x,y]);
                        putnum.push(grid[x][y].count);
                        grid[x][y].count = -3;
                        break;
                    }
                    
                }

                if (temp.includes(grid[x][y]) && grid[x][y].count == -2) {
                    grid[x][y].count = -1;
                    for (let b = 0; b < temp.length; b++) {
                         if ( temp.includes(grid[x][y]) ) {
                            temp.splice(b,1);
                            
                         }
                    }break;
                }

                if (grid[x][y].count == -3) {
                    for (let i = 0; i < putnum.length; i++){
                    for ([x,y] of putposi) {
                            let number = putnum[i];
                            
                            grid[x][y].count = number;
                }
                }
                    }break;
            }
                
            
                
                    countMineNum(); 
            });

            function checkwin() {
                if (num === 0) {
                    alert("勇者斗赢了恶龙，而你战胜了扫雷！");
                }
            }

            function countMineNum(e) {
                let choose = grid[x][y];
                if (choose.count == -2) {
                    num -= 1;
                }else if (choose.count == -1) {
                    num += 1;
                }
                minecount.innerText = num;
            }
            

            
            minecount.innerText = num;

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


function toclear(e) {
    let deltr = document.getElementsByTagName("tr") ;
    for (let i = 0; i < deltr.length;) {
        deltr[0].remove();
    }
}

function basicset(e) {

    let grid = initialize(9,9,10);
    GameSetting(9,9,grid);

    let inputEl = document.getElementsByClassName("diffiset");

    for (i = 0; i < inputEl.length; i++) {

        inputEl[i].onclick = function() {

            let boxwidth,boxheight,num;
            
            if (this.id == 0) {
                boxwidth = 9;
                boxheight = 9;
                num = 10;

            } else if (this.id == 1) {
                boxwidth = 16;
                boxheight = 16;
                num = 40;

            } else if (this.id == 2) {
                boxwidth = 30;
                boxheight = 16;
                num = 99;
                
            } else if (this.id == 3) {
                boxwidth = prompt("请输入宽：");
                boxheight = boxwidth && prompt("请输入高：");
                num = boxheight && prompt("请输入雷数：");
                if (! (boxwidth && boxheight && num)) {
                    return;
                  }
                if (num > boxwidth * boxheight) {
                    alert("雷数过多，请重新输入！")
                }
            }
            grid.PaneRows = boxheight;
            grid.PaneCols = boxwidth;
            grid.MinesNum = num;
            toclear();
            grid = initialize(grid.PaneRows,grid.PaneCols,grid.MinesNum);
            GameSetting(grid.length, grid[0].length, grid);
        }
    }
 
    let resest = document.querySelector("#resest");
    resest.addEventListener("click", (e)=> {
        toclear();
        grid = initialize(9,9,10);
        GameSetting(9,9,grid);
    });

}


basicset();