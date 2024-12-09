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
run(161, ({ input }) => {
    // mul(x,y)
    // regex OR reading chars 1 by 1?

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
