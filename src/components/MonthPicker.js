import React from 'react';
import PropTypes from 'prop-types';
import Utility from '../utilility';

class MonthPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedYear: props.year,
            selectedMonth: props.month
        };
    }

    onYearChange = (event, year) => {
        event.preventDefault();
        this.setState({
            selectedYear: year
        });
    }

    onMonthChange = (event, month) => {
        event.preventDefault();
        this.setState({
            selectedMonth: month,
            isOpen: false
        });
        this.props.onDateChange(this.state.selectedYear, this.state.selectedMonth);
    }


    onDropdownClick = (event) => {
        event.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {selectedMonth, selectedYear} = this.state;
        const {year} = this.props;
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
                    {`${Utility.getMonthString(selectedMonth)}/${selectedYear}`}
                </button>
                {
                    isOpen &&
                    <div className="dropdown-menu" style={{display: 'block'}}>
                        <div className="row">
                            <div className="col border-right">
                                <a key="0" className="dropdown-item">Year</a>
                                {yearRange.map((curYear, idx) => {
                                    return (
                                        <a
                                            href="#"
                                            key={idx + 1} 
                                            className={curYear === selectedYear ? "dropdown-item active" : "dropdown-item"}
                                            onClick={
                                                (event) => {
                                                    this.onYearChange(event, curYear);
                                                }
                                            }
                                        >
                                            {curYear}
                                        </a>
                                    );
                                })}
                            </div>
                            <div className="col">
                                <a key="0" className="dropdown-item">Month</a>
                                {monthRange.map((curMonth, idx) => {
                                    return (
                                        <a
                                            href="#"
                                            key={idx + 1} 
                                            className={curMonth === selectedMonth ? "dropdown-item active" : "dropdown-item"}
                                            onClick={
                                                (event) => {
                                                    this.onMonthChange(event, curMonth);
                                                }
                                            }
                                        >
                                            {Utility.getMonthString(curMonth)}
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
    month: PropTypes.number.isRequired,
    onDateChange: PropTypes.func.isRequired
}

MonthPicker.defaultProps = {
    year: 1970,
    month: 1
}

export default MonthPicker;