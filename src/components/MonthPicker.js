import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Utility from '../utility';

class MonthPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    onYearChange = (event, year) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.onDateChange(year, this.props.month);
    }

    onMonthChange = (event, month) => {
        event.stopPropagation();
        event.preventDefault();
        this.setState({
            isOpen: false
        });
        this.props.onDateChange(this.props.year, month);
    }


    onDropdownClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closeMonthPickerDropdown, false);
    }

    componentDidMount() {
        document.addEventListener('click', this.closeMonthPickerDropdown, false);
    }

    closeMonthPickerDropdown = (event) => {
        // if (ReactDOM.findDOMNode(this).contains(event.target)) {
        //     return;
        // }
        if (this.node.contains(event.target)) {
            return;
        }
        this.setState({
            isOpen: false
        });
    }

    render() {
        const {year, month} = this.props;
        const { isOpen } = this.state;
        const monthRange = Utility.range(12, 1);
        const yearRange = Utility.range(9, -4).map(number => number + year);
        return (
            <div className="dropdown month-picker-component" ref={(ref) => {this.node = ref}}>
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
                            <div className="col border-right years-range">
                                <p key="0" className="dropdown-item-title">Year</p>
                                {yearRange.map((curYear, idx) => {
                                    return (
                                        <a
                                            href="#"
                                            key={idx + 1} 
                                            className={curYear === year ? "dropdown-item active" : "dropdown-item"}
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
                            <div className="col months-range">
                                <p className="dropdown-item-title">Month</p>
                                {monthRange.map((curMonth, idx) => {
                                    return (
                                        <a
                                            href="#"
                                            key={idx + 1} 
                                            className={curMonth === month ? "dropdown-item active" : "dropdown-item"}
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