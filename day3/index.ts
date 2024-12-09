import { run } from '../advent.ts';

/**
 * However, because the program's memory has been corrupted, there are also many invalid
 * characters that should be ignored, even if they look like part of a mul instruction.
 * Sequences like mul(4*, mul(6,9!, ?(12,34), or mul ( 2 , 4 ) do nothing.
 *
 * xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
 * mul(2,4)
 * mul(5,5)
 * mul(11,8)
 * mul(8,5)
 * Only the four highlighted sections are real mul instructions.
 * Adding up the result of each instruction produces 161 (2*4 + 5*5 + 11*8 + 8*5).
 */
// [Part 1] 178886550
run(161, ({ input }) => {
    let m;
    let result = 0;
    const re = /mul\((\d+),(\d+)\)/g;
    do {
        m = re.exec(input);
        if (m) {
            result += Number(m[1]) * Number(m[2]);
        }
    } while (m);
    return result;
});

/**
 * There are two new instructions you'll need to handle:

    - The do() instruction enables future mul instructions.
    - The don't() instruction disables future mul instructions.

    Only the most recent do() or don't() instruction applies. At the beginning of the program, mul instructions are enabled.

    xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))

    x
        YES: mul(2,4)
        &mul[3,7]!^
        -> don't()
        _
        NO: mul(5,5)
        +mul(32,64](
        NO: mul(11,8)
        un
        ->do()?
        YES: mul(8,5)
        )

    This corrupted memory is similar to the example from before, but this time the mul(5,5) and mul(11,8)
     instructions are disabled because there is a don't() instruction before them. The other mul instructions 
     function normally, including the one at the end that gets re-enabled by a do() instruction.

     This time, the sum of the results is 48 (2*4 + 8*5).
 */
// [Part 2] 87163705
run(48, ({ input }) => {
    let m;
    let result = 0;
    const re = /mul\((\d+),(\d+)\)|(do\(\))|(don\'t\(\))/g;

    let doProcess = true;
    do {
        m = re.exec(input);
        if (m) {
            if (m[0] === 'do()') {
                doProcess = true;
            } else if (m[0] === `don't()`) {
                doProcess = false;
            } else if (doProcess) {
                result += Number(m[1]) * Number(m[2]);
            }
        }
    } while (m);
    return result;
});
