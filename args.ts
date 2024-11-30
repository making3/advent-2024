import chalk from 'chalk';
import m from 'minimist';

const argv = m(process.argv.slice(2), {
    boolean: 'sample',
    alias: { help: 'h', sample: 's', part: 'p' },
});

function printHelp() {
    console.log(`
run.js <day> [--sample]

Options:
    --sample, -s        Run sample code from day<day>/sample
    --part, -p          Run a specific part of the day (1 or 2)
    --help, -h          Show this help message
`);
}

if (argv.help) {
    printHelp();
    process.exit(0);
}

const { sample = false } = argv;
export const day = Number(argv._[0]);

if (!argv._.length || isNaN(Number(day))) {
    console.error(chalk.red(`Must provide a day, provided value: "${day}".`));
    printHelp();
    process.exit(1);
}

export const options = { sample };
