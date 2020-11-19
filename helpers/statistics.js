


const convertToDatesArray = (arrayOfObjects) => {
    let datesArray = [];
    arrayOfObjects.forEach(object => {
        datesArray.push(new Date(object.updatedAt));
    });
    return datesArray;
}


const isToday = (date) => {
    const today = new Date();
    return (date.toDateString() === today.toDateString());
}


const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (date.toDateString() === yesterday.toDateString());
}

// returns number of week in month starting from 0
const isDateInMonth = (date, year, month) => {
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

// takes array of dates and returns appearance count in today, yesterday, thisMonth and previousMonth
const countAppearance = (dateArray) => {
    let todayCount = 0;
    let yesterdayCount = 0;

    const today = new Date();
    const thisYear = today.getFullYear();
    const thisMonth = today.getMonth();

    let thisMonthCount = {
        weeks: [0, 0, 0, 0],
        total: 0,
    }

    let previousMonthCount = {
        weeks: [0, 0, 0, 0],
        total: 0,
    }

    dateArray.forEach(date => {
        if (isToday(date)) {
            todayCount++;
        }
        if (isYesterday(date)) {
            yesterdayCount++;
        }
        const thisMonthWeekNumber = isDateInMonth(date, thisYear, thisMonth);
        if (thisMonthWeekNumber >= 0) {
            thisMonthCount.weeks[thisMonthWeekNumber]++;
            thisMonthCount.total++;
        } w
        const previousMonthWeekNumber = isDateInMonth(date, thisYear, thisMonth - 1);
        if (previousMonthWeekNumber >= 0) {
            previousMonthCount.weeks[previousMonthWeekNumber]++;
            previousMonthCount.total++;
        }
    });
    return [
        todayCount,
        yesterdayCount,
        thisMonthCount,
        previousMonthCount,
    ];
}


export const calculateOrders = (ordersDates) => {

    const dateArray = convertToDatesArray(ordersDates);

    const [
        todayCount,
        yesterdayCount,
        thisMonthCount,
        previousMonthCount,
    ] = countAppearance(dateArray);
    const sinceLaunchCount = ordersDates.length;

    return {
        today: todayCount,
        yesterday: yesterdayCount,
        since_launch: sinceLaunchCount,
        this_month: thisMonthCount,
        previous_month: previousMonthCount,
    }
}