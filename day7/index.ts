import { run } from '../advent.ts';

function parse(line: string) {
    const [testValue, rem] = line.split(':');
    const nums = rem
        .split(' ')
        .filter(Boolean)
        .map((n) => Number(n));
    return [Number(testValue), nums] as const;
}

/*
                81
        +40             *40
    +27     *27     +27     *27
*/

function test(testValue: number, nums: number[], total: number, i: number): boolean {
    if (i === nums.length - 1) {
        return total + nums[i] === testValue || total * nums[i] === testValue;
    }

    return (
        test(testValue, nums, total + nums[i], i + 1) ||
        test(testValue, nums, total * nums[i], i + 1)
    );
}

/*
    Each line represents a single equation. The test value appears before the colon on each line;
    it is your job to determine whether the remaining numbers can be combined with operators to 
    produce the test value.

    Operators are always evaluated left-to-right, not according to precedence rules. 
    Furthermore, numbers in the equations cannot be rearranged. Glancing into the jungle, 
    you can see elephants holding two different types of operators: add (+) and multiply (*).
*/
// 3245122495150
run(3749, ({ lines }) => {
    const equations = lines.map(parse);
    let total = 0;
    for (const [testValue, nums] of equations) {
        if (test(testValue, nums, nums[0], 1)) {
            total += testValue;
        }
    }
    return total;
});
