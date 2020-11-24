
const Utility = {
    LIST_VIEW_NAME: 'list-view',
    CHART_VIEW_NAME:'chart-view',
    getMonthString: (month) => {
        return month < 10 ? '0' + month : month;
    }
}

export default Utility;
