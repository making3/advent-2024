import { run } from '../advent.ts';

run(15, ({ lines }) => {
    return lines.reduce((acc, num) => acc + Number(num), 0);
});

run(120, ({ lines }) => {
    return lines.reduce((acc, num) => acc * Number(num), 1);
});
