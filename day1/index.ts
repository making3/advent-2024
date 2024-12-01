import { run } from '../advent.ts';

run(11, ({ lines }) => {
    const leftNums: number[] = [];
    const rightNums: number[] = [];
    for (const line of lines) {
        const [left, right] = line
            .split(' ')
            .map((val) => val.trim())
            .filter(Boolean);
        leftNums.push(Number(left));
        rightNums.push(Number(right));
    }

    leftNums.sort();
    rightNums.sort();

    return leftNums.reduce((acc, left, i) => {
        acc += Math.abs(rightNums[i] - left);
        return acc;
    }, 0);
});

run(31, ({ lines }) => {
    const leftNums: number[] = [];
    const rightNums = new Map<number, number>();
    for (const line of lines) {
        const [left, right] = line
            .split(' ')
            .map((val) => val.trim())
            .filter(Boolean);
        leftNums.push(Number(left));

        const rightNum = Number(right);
        if (rightNums.has(rightNum)) {
            rightNums.set(rightNum, rightNums.get(rightNum)! + 1);
        } else {
            rightNums.set(rightNum, 1);
        }
    }

    return leftNums.reduce((acc, left, i) => {
        if (rightNums.has(left)) {
            acc += left * rightNums.get(left)!;
        }
        return acc;
    }, 0);
});
