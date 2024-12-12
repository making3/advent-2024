import { run } from '../advent.ts';

function parse(input: string) {
    let id = 0;
    let file = true;
    let blocks = [];

    // [len, index]
    let freeSpaceBlocks: [number, number][] = [];

    // len, index
    let idGroups: [number, number, number][] = [];

    for (const c of input) {
        const len = Number(c);
        if (file) {
            idGroups.splice(0, 0, [len, blocks.length, id]);
            for (let i = 0; i < len; i++) {
                blocks.push(id);
            }
            id++;
        } else {
            freeSpaceBlocks.push([len, blocks.length]);
            for (let i = 0; i < len; i++) {
                blocks.push('.');
            }
        }
        file = !file;
    }
    return [blocks, freeSpaceBlocks, idGroups] as const;
}

// 6337921897505
run(1928, ({ input }) => {
    const [blocks] = parse(input);

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

// 6362722604045
run(2858, ({ input }) => {
    const [blocks, freeSpaceBlocks, idGroups] = parse(input);

    for (const [idGroupLen, idGroupIndex, id] of idGroups) {
        const freeSpaceBlockIndex = freeSpaceBlocks.findIndex(([len]) => len >= idGroupLen);
        if (freeSpaceBlockIndex === -1) {
            continue;
        }
        const [freeGroupLen, freeStartIndex] = freeSpaceBlocks[freeSpaceBlockIndex];
        if (freeStartIndex >= idGroupIndex) {
            continue;
        }

        for (let i = 0; i < idGroupLen; i++) {
            blocks[freeStartIndex + i] = blocks[idGroupIndex + i];
            blocks[idGroupIndex + i] = '.';
        }
        const offset = freeGroupLen - idGroupLen;
        if (offset > 0) {
            freeSpaceBlocks[freeSpaceBlockIndex] = [offset, freeStartIndex + idGroupLen];
        } else {
            freeSpaceBlocks.splice(freeSpaceBlockIndex, 1);
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
