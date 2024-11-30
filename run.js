#!/usr/bin/env node
import chalk from 'chalk';
import m from 'minimist';
import path from 'node:path';
import fs from 'fs-extra';

const argv = m(process.argv.slice(2), {
    boolean: 'sample',
    alias: { help: 'h' },
});

function printHelp() {
    console.log(`
run.js <day> [--sample]

Options:
    --sample, -s        Run sample code from day<day>/sample
    --help, -h          Show this help message
`);
}

if (argv.help) {
    printHelp();
    process.exit(0);
}

const { sample = false } = argv;
const day = Number(argv._[0]);

if (!argv._.length || isNaN(Number(day))) {
    console.error(chalk.red(`Must provide a day, provided value: "${day}".`));
    printHelp();
    process.exit(1);
}

const options = { sample };
console.log(chalk.cyan(`Running day ${day} with options ${JSON.stringify(options)}`));
const relativeDayCodePath = `day${day}/index.js`;
const dayCodePath = path.join(import.meta.dirname, relativeDayCodePath);

if (!fs.existsSync(dayCodePath)) {
    console.warn(
        chalk.yellow(
            `Code for day "${day}" does not exist (tested relative path "${relativeDayCodePath}").`,
        ),
    );
    process.exit(1);
}

await import(`./day${day}/index.js`);
