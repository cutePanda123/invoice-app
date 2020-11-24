import React from 'react';
import PropTypes from 'prop-types';
import Utility from '../utilility';

class MonthPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    onDropdownClick = (event) => {
        event.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {year, month} = this.props;
        const { isOpen } = this.state;
        const monthRange = Utility.range(12, 1);
        const yearRange = Utility.range(9, -4).map(number => number + year);
        return (
            <div className="dropdown month-picker-component">
                <h4>Select a month</h4>
                <button
                    className="btn btn-lg btn-secondary dropdown-toggle"
                    onClick={this.onDropdownClick}
                >
                    {`${Utility.getMonthString(month)}/${year}`}
                </button>
                {
                    isOpen &&
                    <div className="dropdown-menu" style={{display: 'block'}}>
                        <div className="row">
                            <div className="col border-right">
                                <a key="0" className="dropdown-item">Year</a>
                                {yearRange.map((year, idx) => {
                                    return (
                                        <a key={idx + 1} className="dropdown-item">
                                            {year}
                                        </a>
                                    );
                                })}
                            </div>
                            <div className="col">
                                <a key="0" className="dropdown-item">Month</a>
                                {monthRange.map((month, idx) => {
                                    return (
                                        <a key={idx + 1} className="dropdown-item">
                                            {Utility.getMonthString(month)}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                }
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