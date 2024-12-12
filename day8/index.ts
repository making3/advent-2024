import { run } from '../advent.ts';

function gridify(lines: string[]) {
    const antennas = new Map<string, [number, number][]>();
    const grid = lines.map((line, row) =>
        line.split('').map((c, col) => {
            if (c !== '.') {
                if (!antennas.has(c)) {
                    antennas.set(c, []);
                }
                antennas.get(c)!.push([row, col]);
            }
            return c;
        }),
    );

    return [grid, antennas] as const;
}

function distanceBetween(
    [firstRow, firstCol]: [number, number],
    [secondRow, secondCol]: [number, number],
) {
    return [Math.abs(secondRow - firstRow), secondCol - firstCol] as const;
}

/*
......#....#
...#....0...
....#0....#.
..#....0....
....0....#..
.#....A.....
...#........
#......#....
........A...
.........A..
..........#.
..........#.
*/
// 289
run(14, ({ lines }) => {
    const [grid, antennas] = gridify(lines);

    const antinodes = new Set<string>();
    function addToAntinode([row, col]: [number, number]) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) {
            return;
        }

        antinodes.add(`${row}-${col}`);
    }

    for (const [antenna, nodes] of antennas.entries()) {
        if (nodes.length < 2) {
            continue;
        }

        for (let i = 0; i < nodes.length; i++) {
            for (let k = i + 1; k < nodes.length; k++) {
                const [row, col] = distanceBetween(nodes[i], nodes[k]);

                addToAntinode([nodes[i][0] - row, nodes[i][1] - col]);
                addToAntinode([nodes[k][0] + row, nodes[k][1] + col]);
            }
        }
    }

    for (const antinode of antinodes) {
        const [row, col] = antinode.split('-').map((n) => Number(n));
        grid[row][col] = '#';
    }

    return antinodes.size;
});

/*
##....#....#
.#.#....0...
..#.#0....#.
..##...0....
....0....#..
.#...#A....#
...#..#.....
#....#.#....
..#.....A...
....#....A..
.#........#.
...#......##
*/
run(34, ({ lines }) => {
    const [grid, antennas] = gridify(lines);

    const antinodes = new Set<string>();
    function addToAntinode([row, col]: [number, number], addToRow: number, addToCol: number) {
        while (row >= 0 && row < grid.length && col >= 0 && col < grid[row].length) {
            if (row >= 0 && row < grid.length && col >= 0 && col < grid[row].length) {
                antinodes.add(`${row}-${col}`);
            }
            row = row + addToRow;
            col = col + addToCol;
        }
    }

    for (const [antenna, nodes] of antennas.entries()) {
        if (nodes.length < 2) {
            continue;
        }

        for (let i = 0; i < nodes.length; i++) {
            for (let k = i + 1; k < nodes.length; k++) {
                const [row, col] = distanceBetween(nodes[i], nodes[k]);

                addToAntinode(nodes[i], -row, -col);
                addToAntinode(nodes[k], row, col);
            }
        }
    }

    for (const antinode of antinodes) {
        const [row, col] = antinode.split('-').map((n) => Number(n));
        grid[row][col] = '#';
    }

    return antinodes.size;
});
