import { isToday, isYesterday, isDateInMonth } from "./dateChecks";

// takes array of dates and returns appearance count in today, yesterday, thisMonth and previousMonth
const countAppearance = (dateArray) => {
    const today = new Date();
    const thisYear = today.getFullYear();
    const thisMonth = today.getMonth();

    let todayCount = 0;
    let yesterdayCount = 0;
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
    const today = new Date();
    const thisYear = today.getFullYear();
    const thisMonth = today.getMonth();

    let todayTotal = 0.0;
    let yesterdayTotal = 0.0;
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
    const dateArray = [];
    ordersDates.forEach(object => {
        dateArray.push(new Date(object.updatedAt));
    });

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
    const [dateArray, revenueArray] = [[], []];
    let totalRevenue;

    orders.forEach(object => {
        dateArray.push(new Date(object.updatedAt));
        revenueArray.push(object.total);
        totalRevenue += object.total;
    });

    const [
        todayCount,
        yesterdayCount,
        thisMonthCount,
        previousMonthCount,
    ] = countTotalByDate(dateArray, revenueArray);


    return {
        today: todayCount,
        yesterday: yesterdayCount,
        since_launch: totalRevenue,
        this_month: thisMonthCount,
        previous_month: previousMonthCount,
    }
}

export const calculateUsers = (userCreationDates) => {

    const dateArray = [];
    userCreationDates.forEach(object => {
        dateArray.push(new Date(object.createdAt));
    });

    const [
        todayCount,
        yesterdayCount,
        thisMonthCount,
        previousMonthCount,
    ] = countAppearance(dateArray);
    const sinceLaunchCount = userCreationDates.length;

    return {
        today: todayCount,
        yesterday: yesterdayCount,
        since_launch: sinceLaunchCount,
        this_month: thisMonthCount,
        previous_month: previousMonthCount,
    }
}