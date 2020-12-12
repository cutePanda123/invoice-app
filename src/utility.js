
const Utility = {
    LIST_VIEW_NAME: 'list-view',
    CHART_VIEW_NAME:'chart-view',
    INCOME_TYPE: 'income',
    OUTCOME_TYPE: 'outcome',
    getMonthString: (month) => {
        return month < 10 ? '0' + month : month;
    },
    range: (size, startAt = 0) => {
        const array = [];
        for (let i = 0; i < size; i++) {
            array[i] = i + startAt;
        }
        return array;
    },

    parseYearAndMonth: (str) => {
        const date = str ? new Date(str) : new Date();
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1
        };
    },

    flattenArray: (array) => {
        return array.reduce((accumulator, currentValue) => {
            accumulator[currentValue.id] = currentValue;
            return accumulator;
        }, {});
    }
}

export default Utility;
