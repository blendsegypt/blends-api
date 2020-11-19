// approach in sending as objects and destructuring using "As"


// TODO: fix bad practice "UpdatedAt"
const convertToDatesArray = (arrayOfObjects) => {
    let datesArray = [];
    arrayOfObjects.forEach(object => {
        datesArray.push(new Date(object.updatedAt));
    });
    return datesArray;
}

// TODO: fix bad practice "total"
const convertToValueArray = (arrayOfObjects) => {
    let valueArray = [];
    let sum = 0.0;
    arrayOfObjects.forEach(object => {
        valueArray.push(object.total);
        sum += object.total;
    });
    return [
        valueArray,
        sum,
    ]
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
        }
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


// takes array of dates and returns total count in today, yesterday, thisMonth and previousMonth
const countTotalByDate = (dateArray, total) => {
    let todayTotal = 0.0;
    let yesterdayTotal = 0.0;

    const today = new Date();
    const thisYear = today.getFullYear();
    const thisMonth = today.getMonth();

    let thisMonthTotal = {
        weeks: [0.0, 0.0, 0.0, 0.0],
        total: 0.0,
    }

    let previousMonthTotal = {
        weeks: [0.0, 0.0, 0.0, 0.0],
        total: 0.0,
    }

    dateArray.forEach((date, i) => {
        if (isToday(date)) {
            todayTotal += total[i];
        }
        if (isYesterday(date)) {
            yesterdayTotal += total[i];
        }
        const thisMonthWeekNumber = isDateInMonth(date, thisYear, thisMonth);
        if (thisMonthWeekNumber >= 0) {
            thisMonthTotal.weeks[thisMonthWeekNumber] += total[i];
            thisMonthTotal.total += total[i];
        }
        const previousMonthWeekNumber = isDateInMonth(date, thisYear, thisMonth - 1);
        if (previousMonthWeekNumber >= 0) {
            previousMonthTotal.weeks[previousMonthWeekNumber] += total[i];
            previousMonthTotal.total += total[i];
        }
    });
    return [
        todayTotal,
        yesterdayTotal,
        thisMonthTotal,
        previousMonthTotal,
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

export const calculateRevenue = (orders) => {
    const dateArray = convertToDatesArray(orders);
    const [revenueArray, total] = convertToValueArray(orders);

    const [
        todayCount,
        yesterdayCount,
        thisMonthCount,
        previousMonthCount,
    ] = countTotalByDate(dateArray, revenueArray);


    return {
        today: todayCount,
        yesterday: yesterdayCount,
        since_launch: total,
        this_month: thisMonthCount,
        previous_month: previousMonthCount,
    }
}