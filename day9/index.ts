import { run } from '../advent.ts';

function parse(input: string) {
    let id = 0;
    let file = true;
    let blocks = [];
    for (const c of input) {
        const len = Number(c);
        if (file) {
            for (let i = 0; i < len; i++) {
                blocks.push(id);
            }
            id++;
        } else {
            for (let i = 0; i < len; i++) {
                blocks.push('.');
            }
        }
        file = !file;
    }
    return blocks;
}

// 6337921897505
run(1928, ({ input }) => {
    const blocks = parse(input);

    let freeSpace = 0;
    let file = blocks.length - 1;

    while (freeSpace <= file) {
        if (blocks[file] === '.') {
            file--;
        } else if (blocks[freeSpace] !== '.') {
            freeSpace++;
        } else {
            blocks[freeSpace] = blocks[file];
            blocks[file] = '.';
        }
    }

    let total = 0;
    let id = 0;

    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] === '.') {
            continue;
        }
        total += Number(blocks[i]) * i;
        id++;
    }

    return total;
});
