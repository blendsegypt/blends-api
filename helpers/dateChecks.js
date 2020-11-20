export const isToday = (date) => {
    const today = new Date();
    return (date.toDateString() === today.toDateString());
}

export const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (date.toDateString() === yesterday.toDateString());
}

// returns week nuber in month in year starting from 0 to 3
export const isDateInYearInMonth = (date, year, month) => {
    const weeks = [
        new Date(year, month), // last day of previous month
        new Date(year, month, 8),
        new Date(year, month, 15),
        new Date(year, month, 22),
        new Date(year, month + 1), // last day of this month
    ]

    for (let weekNumber = 0; weekNumber < 4; weekNumber++) {
        if (date >= weeks[weekNumber] && date < weeks[weekNumber + 1]) {
            return weekNumber;
        }
    }
    return -2500; // not a week number
}