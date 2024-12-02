import fs from 'fs-extra';
import path from 'node:path';
import { day, options } from './args.ts';
import chalk from 'chalk';

type AnswerCallback<T> = (helpers: { input: string; lines: string[] }) => T;

function getAnswer<T>(callback: AnswerCallback<T>, filename: 'sample' | 'input') {
    const inputFilename = path.join(import.meta.dirname, `./day${day}/${filename}`);
    const input = fs.readFileSync(inputFilename, 'utf-8');
    const lines = input.split(/[\r\n/]/);

    return callback({ lines, input });
}

let callCount = 0;
export function run<T>(expected: T, callback: AnswerCallback<T | void>) {
    callCount++;
    const actual = getAnswer(callback, options.sample ? 'sample' : 'input');

    if (options.sample) {
        if (actual === expected) {
            console.log(chalk.green(`[Sample, Part ${callCount}] passed (answer ${actual})`));
        } else {
            console.log(
                chalk.red(`[Sample, Part ${callCount}] expected ${actual} to be ${expected}`),
            );
        }
    } else {
        console.log(chalk.white(`[Part ${callCount}] ${actual}`));
    }

    return actual;
}
