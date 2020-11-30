import React from 'react';
import PropTypes from 'prop-types';

const SpendingSummary = ({income, outcome}) => {
    return (
        <div className="containers">
            <div className="row">
                <div className="col">
                    <h5>Income: </h5><div>{income}</div>
                </div>
                <div className="col">
                    <h5>Outcome: </h5><div>{outcome}</div>
                </div>
            </div>
        </div>
    );
}

SpendingSummary.propTypes = {
    income: PropTypes.number.isRequired,
    outcome: PropTypes.number.isRequired
}

SpendingSummary.defaultProps = {
    income: 0,
    outcome: 0
}

export default SpendingSummary;
