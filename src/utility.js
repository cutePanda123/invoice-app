
const Utility = {
    LIST_VIEW_NAME: 'list-view',
    CHART_VIEW_NAME:'chart-view',
    INCOME_TYPE: 'income',
    OUTCOME_TYPE: 'outcome',
    Colors: {
        blue: '#347eff',
        deepBlue: '#61dafb',
        green: '#28a745',
        red: '#dc3545',
        gray: '#555',
        lightGray: '#efefef',
        white: '#fff',
    },
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
    },

    getDateTag: (date) => {
        const lastIdx = date.lastIndexOf("-");
        return date.substring(0, lastIdx);
    }
}

export default Utility;
