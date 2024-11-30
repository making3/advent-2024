import chalk from 'chalk';
import path from 'node:path';
import fs from 'fs-extra';
import { day, options } from './args.ts';

console.log(chalk.cyan(`Running day ${day} with ${JSON.stringify(options)}`));
const relativeDayCodePath = `day${day}/index.ts`;
const dayCodePath = path.join(import.meta.dirname, relativeDayCodePath);

if (!fs.existsSync(dayCodePath)) {
    console.warn(
        chalk.yellow(
            `Code for day "${day}" does not exist (tested relative path "${relativeDayCodePath}").`,
        ),
    );
    process.exit(1);
}

await import(`./day${day}/index.ts`);
