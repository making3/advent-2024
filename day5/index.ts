import { run } from '../advent.ts';

/*
The notation X|Y means that if both page number X and page number Y are to be produced as part of an update,
page number X must be printed at some point before page number Y.

97|13
97|61
97|47
*/
function parse(lines: string[]) {
    let processUpdates = false;
    const pageOrders = new Map<string, string[]>();
    const updates = [];

    for (const line of lines) {
        if (!line) {
            processUpdates = true;
        } else if (processUpdates) {
            updates.push(line.split(','));
        } else {
            const [x, y] = line.split('|');
            if (!pageOrders.has(x)) {
                pageOrders.set(x, []);
            }
            pageOrders.get(x)!.push(y);
        }
    }
    return { pageOrders, updates };
}

/*
75,47,*61*,53,29
97,61,*53*,29,13
75,*29*,13

These have middle page numbers of 61, 53, and 29 respectively. Adding these page numbers together gives 143.
*/
// 5639
run(143, ({ lines }) => {
    const { pageOrders, updates } = parse(lines);

    let total = 0;
    for (const update of updates) {
        if (updateIsGood(update, pageOrders)) {
            const middle = update[(update.length - 1) / 2];
            total += Number(middle);
        }
    }
    return total;
});

function updateIsGood(update: string[], pageOrders: Map<string, string[]>) {
    const found = new Set<string>();
    /*
        97 must be before [13, 61, 47]
        x                 [y,y,y]
        pageOrders = { 97: [13,61,47]}
     */
    for (const n of update) {
        if (pageOrders.has(n)) {
            const expectedPagesAfter = pageOrders.get(n);
            if (expectedPagesAfter && !expectedPagesAfter.every((e) => !found.has(e))) {
                return false;
            }
        }
        found.add(n);
    }

    return true;
}

/*
For each of the incorrectly-ordered updates, use the page ordering rules to put the page numbers in the right order.
 For the above example, here are the three incorrectly-ordered updates and their correct orderings:

    75,97,47,61,53 becomes 97,75,47,61,53.
    61,13,29 becomes 61,29,13.
    97,13,75,29,47 becomes 97,75,47,29,13.

After taking only the incorrectly-ordered updates and ordering them correctly, their middle page numbers are 
47, 29, and 47. Adding these together produces 123.
*/
// 5273
run(123, ({ lines }) => {
    const { pageOrders, updates } = parse(lines);

    let total = 0;
    for (const pages of updates) {
        const [newPages, updated] = getNewList(pages, pageOrders);
        if (updated) {
            const middle = newPages[(newPages.length - 1) / 2];
            total += Number(middle);
        }
    }
    return total;
});

function getNewList(oldPages: string[], pageOrders: Map<string, string[]>) {
    const pages = [...oldPages];

    let i = 0;
    let updated = false;
    while (i < pages.length) {
        const page = pages[i];
        const pagesAfter = pageOrders.get(page);
        if (pagesAfter) {
            const lowestPageIndexes = pagesAfter
                .map((pg) => pages.indexOf(pg))
                .filter((index) => index > -1)
                .toSorted((a, b) => a - b);

            if (lowestPageIndexes.length && lowestPageIndexes[0] < i) {
                updated = true;
                pages.splice(i, 1);
                pages.splice(lowestPageIndexes[0], 0, page);
                i = 0;
                continue;
            }
        }
        i++;
    }

    return [pages, updated] as const;
}
