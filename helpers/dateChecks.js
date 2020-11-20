export const isToday = (date) => {
    const today = new Date();
    return (date.toDateString() === today.toDateString());
}

export const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (date.toDateString() === yesterday.toDateString());
}

// returns number of week in month starting from 0 to 3
export const isDateInMonth = (date, year, month) => {
    const weeks = [
        new Date(year, month), // last day of previous month
        new Date(year, month, 8),
        new Date(year, month, 15),
        new Date(year, month + 1), // last day of this month
    ]

    for (let i = 0; i < 4; i++) {
        if (date > weeks[i] && date <= weeks[i + 1]) {
            return i;
        }
    }
    return -2500;
}