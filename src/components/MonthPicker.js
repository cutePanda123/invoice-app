import React from 'react';
import PropTypes from 'prop-types';
import Utility from '../utilility';

class MonthPicker extends React.Component {
    render() {
        const {year, month} = this.props;
        return (
            <div className="dropdown month-picker-component">
                <h4>Select a month</h4>
                <button className="btn btn-lg btn-secondary dropdown-toggle">
                    {`${Utility.getMonthString(month)}/${year}`}
                </button>
            </div>
        );
    }
}

MonthPicker.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired
}

MonthPicker.defaultProps = {
    year: 1970,
    month: 1
}

export default MonthPicker;