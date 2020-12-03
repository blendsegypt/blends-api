import { isToday, isYesterday, isDateInYearInMonth } from "./dateChecks";

// takes array of dates and returns appearance count in today, yesterday, thisMonth and previousMonth
const countByDate = (dateArray) => {
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
        const thisMonthWeekNumber = isDateInYearInMonth(date, thisYear, thisMonth);
        if (thisMonthWeekNumber >= 0) {
            thisMonthCount.weeks[thisMonthWeekNumber]++;
            thisMonthCount.total++;
        }
        const previousMonthWeekNumber = isDateInYearInMonth(date, thisYear, thisMonth - 1);
        if (previousMonthWeekNumber >= 0) {
            previousMonthCount.weeks[previousMonthWeekNumber]++;
            previousMonthCount.total++;
        }
    });
    return {
        todayCount,
        yesterdayCount,
        thisMonthCount,
        previousMonthCount,
    };
}


// takes array of dates and amounts and returns total amounts in today, yesterday, thisMonth and previousMonth
const calculateTotalByDate = (dateArray, amounts) => {
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
            todayTotal += amounts[i];
        }
        if (isYesterday(date)) {
            yesterdayTotal += amounts[i];
        }
        const thisMonthWeekNumber = isDateInYearInMonth(date, thisYear, thisMonth);
        if (thisMonthWeekNumber >= 0) {
            thisMonthTotal.weeks[thisMonthWeekNumber] += amounts[i];
            thisMonthTotal.total += amounts[i];
        }
        const previousMonthWeekNumber = isDateInYearInMonth(date, thisYear, thisMonth - 1);
        if (previousMonthWeekNumber >= 0) {
            previousMonthTotal.weeks[previousMonthWeekNumber] += amounts[i];
            previousMonthTotal.total += amounts[i];
        }
    });
    return {
        todayTotal,
        yesterdayTotal,
        thisMonthTotal,
        previousMonthTotal,
    };
}


export const countOrders = (ordersDates) => {
    const dateArray = [];
    const sinceLaunchCount = ordersDates.length;
    ordersDates.forEach(object => {
        dateArray.push(new Date(object.updatedAt));
    });
    const countedOrdersData = countByDate(dateArray);
    return {
        today: countedOrdersData.todayCount,
        yesterday: countedOrdersData.yesterdayCount,
        since_launch: sinceLaunchCount,
        this_month: countedOrdersData.thisMonthCount,
        previous_month: countedOrdersData.previousMonthCount,
    }
}

export const calculateRevenue = (orders) => {
    const [dateArray, revenueArray] = [[], []];
    let totalRevenue = 0;
    orders.forEach(object => {
        dateArray.push(new Date(object.updatedAt));
        revenueArray.push(object.total);
        totalRevenue += object.total;
    });
    const calculatedRevenueData = calculateTotalByDate(dateArray, revenueArray);
    return {
        today: calculatedRevenueData.todayTotal,
        yesterday: calculatedRevenueData.yesterdayTotal,
        since_launch: totalRevenue,
        this_month: calculatedRevenueData.thisMonthTotal,
        previous_month: calculatedRevenueData.previousMonthTotal,
    }
}

export const countUsers = (userCreationDates) => {

    const dateArray = [];
    const sinceLaunchCount = userCreationDates.length;
    userCreationDates.forEach(object => {
        dateArray.push(new Date(object.createdAt));
    });
    const countedUsersData = countByDate(dateArray);
    return {
        today: countedUsersData.todayCount,
        yesterday: countedUsersData.yesterdayCount,
        since_launch: sinceLaunchCount,
        this_month: countedUsersData.thisMonthCount,
        previous_month: countedUsersData.previousMonthCount,
    }
}