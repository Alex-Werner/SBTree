export function comparatorString(a, b) {
    if (typeof a !== 'string') a = String(a);
    if (typeof b !== 'string') b = String(b);
    return (a > b ? 1 : (a < b ? -1 : 0));
};

export function comparatorNum(a, b) {
    return (a > b ? 1 : (a < b ? -1 : 0));
};

export function comparatorDate(a, b) {
    return (a.getTime() > b.getTime() ? 1 : (a.getTime() < b.getTime() ? -1 : 0));
};

