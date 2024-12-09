import { run } from '../advent.ts';

// [row,col]
const allCombos = [
    // above
    [-1, -1],
    [-1, 0],
    [-1, 1],

    // left/right
    [0, -1],
    [0, 1],

    // below
    [1, -1],
    [1, 0],
    [1, 1],
];

function gridify(lines: string[]): string[][] {
    return lines.map((line) => line.split('').map((c) => c));
}

/**
From Sample, relevant characters:

....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX


->>>Looking for XMAS

 */
// 2414
run(18, ({ lines }) => {
    const grid = gridify(lines);

    let count = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const totalFound = findXmas(grid, row, col, 'X');
            count += totalFound;
        }
    }
    return count;
});

function findXmas(
    grid: string[][],
    row: number,
    col: number,
    expectedChar: string,
    combos: number[][] = allCombos,
) {
    const c = grid[row]?.[col];
    if (c !== expectedChar) {
        return 0;
    }

    let next;
    if (expectedChar === 'X') {
        next = 'M';
    } else if (expectedChar === 'M') {
        next = 'A';
    } else if (expectedChar === 'A') {
        next = 'S';
    } else {
        return 1;
    }

    let total = 0;
    for (const [addToRow, addToCol] of combos) {
        let newCombos = [[addToRow, addToCol]];
        if (findXmas(grid, row + addToRow, col + addToCol, next, newCombos)) {
            total++;
        }
    }

    return total;
}

/**
 *
It's an X-MAS puzzle in which you're supposed to find two MAS in the shape of an X.


M.S
.A.
M.S

Within the X, each MAS can be written forwards or backwards.

.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........
 */
// 1871
run(9, ({ lines }) => {
    const grid = gridify(lines);

    let count = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 'A' && findMAS(grid, row, col)) {
                count += 1;
            }
        }
    }
    return count;
});

/**

M.S
.A.
M.S

 */
function findMAS(grid: string[][], row: number, col: number) {
    const topLeft = grid[row - 1]?.[col - 1];
    const bottomRight = grid[row + 1]?.[col + 1];
    const topLeftMatch = topLeft === 'M' || topLeft === 'S';
    const bottomRightMatch = bottomRight === 'M' || bottomRight === 'S';

    const topRight = grid[row - 1]?.[col + 1];
    const bottomLeft = grid[row + 1]?.[col - 1];
    const topRightMatch = topRight === 'M' || topRight === 'S';
    const bottomLeftMatch = bottomLeft === 'M' || bottomLeft === 'S';

    return (
        topLeftMatch &&
        bottomRightMatch &&
        topLeft !== bottomRight &&
        topRightMatch &&
        bottomLeftMatch &&
        topRight !== bottomLeft
    );
}
