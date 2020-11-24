
const Utility = {
    LIST_VIEW_NAME: 'list-view',
    CHART_VIEW_NAME:'chart-view',
    getMonthString: (month) => {
        return month < 10 ? '0' + month : month;
    },
    range: (size, startAt = 0) => {
        const array = [];
        for (let i = startAt; i <= size; i++) {
            array[i - startAt] = i;
        }
        return array;
    }
}

export default Utility;
