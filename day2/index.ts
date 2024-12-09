import { run } from '../advent.ts';

function isSafeStill(nums: number[], curr: number) {
    const isTrendingTheSame =
        curr + 2 >= nums.length || nums[curr] > nums[curr + 1] === nums[curr + 1] > nums[curr + 2];
    const diff = Math.abs(nums[curr] - nums[curr + 1]);

    return isTrendingTheSame && diff >= 1 && diff <= 3;
}

function numsAreSafe(nums: number[]) {
    for (let i = 0; i < nums.length - 1; i++) {
        if (!isSafeStill(nums, i)) {
            return false;
        }
    }

    return true;
}

function isSafe(line: string, { dampen } = { dampen: false }) {
    const nums = line.split(' ').map((s) => Number(s));

    const result = numsAreSafe(nums);
    if (dampen && !result) {
        for (let i = 0; i < nums.length; i++) {
            const numsWithoutCurrentIndex = nums.toSpliced(i, 1);

            if (numsAreSafe(numsWithoutCurrentIndex)) {
                return true;
            }
        }
    }
    return result;
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

// 404
/*
Now, the same rules apply as before, except if removing a single 
level from an unsafe report would make it safe, the report instead 
counts as safe.
*/
run(4, ({ lines }) => {
    return lines.filter(Boolean).filter((line) => isSafe(line, { dampen: true })).length;
});
