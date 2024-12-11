import { run } from '../advent.ts';

function dir(c: string) {
    if (c === '^') {
        return 'up';
    }
    if (c === '>') {
        return 'right';
    }
    if (c === 'V') {
        return 'down';
    }
    return 'left';
}

function gridify(lines: string[]) {
    let startPosition: [number, number, string] = [-1, -1, ''];
    const grid = lines.map((line, row) =>
        line.split('').map((c, col) => {
            if (['^', '>', '<', 'V'].includes(c)) {
                startPosition = [row, col, dir(c)];
            }
            return c;
        }),
    );

    return [grid, startPosition] as const;
}

/*

    If there is something directly in front of you, **turn right 90 degrees.**
    Otherwise, take a step forward.

    In this example, the guard will visit 41 distinct positions on your map.
    (including starting)
*/
// 4515
run(41, ({ lines }) => {
    const [grid, startPosition] = gridify(lines);

    let total = 0;
    let [row, col, dir] = startPosition;
    while (row > -1 && row < grid.length && col > -1 && col < grid[0].length) {
        if (grid[row][col] !== 'X') {
            grid[row][col] = 'X';
            total++;
        }
        if (dir === 'up') {
            if (row === 0) {
                break;
            }
            if (grid[row - 1][col] === '#') {
                dir = 'right';
            } else {
                row--;
            }
        } else if (dir === 'right') {
            if (col === grid[0].length - 1) {
                break;
            }

            if (grid[row][col + 1] === '#') {
                dir = 'down';
            } else {
                col++;
            }
        } else if (dir === 'down') {
            if (row === grid.length - 1) {
                break;
            }
            if (grid[row + 1][col] === '#') {
                dir = 'left';
            } else {
                row++;
            }
        } else if (dir === 'left') {
            if (col === 0) {
                break;
            }
            if (grid[row][col - 1] === '#') {
                dir = 'up';
            } else {
                col--;
            }
        }
    }

    // console.log(
    //     grid.reduce((acc, row) => {
    //         total2 += row.filter((c) => c === 'X').length;
    //         acc += row.join('') + '\n';
    //         return acc;
    //     }, ''),
    // );

    return total;
});

/*
    In the above example, there are only 6 different positions where a new 
    obstruction would cause the guard to get stuck in a loop. 
    The diagrams of these six situations use O to mark the new obstruction, 
    | to show a position where the guard moves up/down, 
    - to show a position where the guard moves left/right, and 
    + to show a position where the guard moves both up/down and left/right.

    It doesn't really matter what you choose to use as an obstacle so long as you 
    and The Historians can put it into position without the guard noticing. 
    The important thing is having enough options that you can find one that minimizes 
    time paradoxes, and in this example, there are 6 different positions you could choose.
*/
// 1309
run(6, ({ lines }) => {
    // Can't be at `startPosition`

    /*
        Naive solution:

        for each row/col:
            start up/down/left/right
            see if it creates loop (hits row/col again)
    */

    let total = 0;
    let turns = [];
    const [grid, startPosition] = gridify(lines);
    const [startRow, startCol, dir] = startPosition;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const phreshGrid = JSON.parse(JSON.stringify(grid));
            phreshGrid[row][col] = '#';
            const turn = isLoop(phreshGrid, startRow, startCol, dir);
            if (turn) {
                turns.push(turn);
                total += 1;
            }
        }
    }
    return total;
});

function isLoop(grid: string[][], row: number, col: number, dir: string) {
    let isLoop = false;
    const turns: string[] = [];

    function turn() {
        grid[row][col] = '+';

        const turn = `${row}-${col}`;
        const existingTurnIndex = turns.indexOf(turn);
        const all = turns.slice(existingTurnIndex);
        if (all.length > 4) {
            return all;
        }
        turns.push(turn);
    }

    while (row > -1 && row < grid.length && col > -1 && col < grid[0].length) {
        if (dir === 'up') {
            if (row === 0) {
                break;
            }
            if (grid[row - 1][col] === '#') {
                dir = 'right';
                const loop = turn();
                if (loop) {
                    return loop;
                }
            } else {
                row--;
                grid[row][col] = '|';
            }
        } else if (dir === 'right') {
            if (col === grid[0].length - 1) {
                break;
            }

            if (grid[row][col + 1] === '#') {
                dir = 'down';
                const loop = turn();
                if (loop) {
                    return loop;
                }
            } else {
                col++;
                grid[row][col] = '-';
            }
        } else if (dir === 'down') {
            if (row === grid.length - 1) {
                break;
            }
            if (grid[row + 1][col] === '#') {
                dir = 'left';
                const loop = turn();
                if (loop) {
                    return loop;
                }
            } else {
                row++;
                grid[row][col] = '|';
            }
        } else if (dir === 'left') {
            if (col === 0) {
                break;
            }
            if (grid[row][col - 1] === '#') {
                dir = 'up';
                const loop = turn();
                if (loop) {
                    return loop;
                }
            } else {
                col--;
                grid[row][col] = '-';
            }
        }
    }

    return isLoop;
}
