import { run } from '../advent.ts';

function isSafe(line: string) {
    const nums = line.split(' ').map((s) => Number(s));

    for (let i = 1; i < nums.length; i++) {
        const last = nums[i - 1];
        const curr = nums[i];
        const diff = Math.abs(last - curr);
        if (diff < 1 || diff > 3) {
            return false;
        }

        if (i === 1) {
            continue;
        }

        const lastIncreasing = last > nums[i - 2];
        const currentIncreasing = curr > last;
        if (lastIncreasing !== currentIncreasing) {
            return false;
        }
    }

    return true;
}

// 341
/*
Safe if:
    The levels are either all increasing or all decreasing.
    Any two adjacent levels differ by at least one and at most three.
*/
run(2, ({ lines }) => {
    return lines.filter(Boolean).filter((line) => isSafe(line)).length;
});
