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
