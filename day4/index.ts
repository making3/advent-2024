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
