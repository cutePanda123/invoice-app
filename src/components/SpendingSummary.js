import React from 'react';
import PropTypes from 'prop-types';

const SpendingSummary = ({income, outcome}) => {
    return (
        <div className="containers">
            <div className="row">
                <div className="col">Income: {income}</div>
                <div className="col">Outcome: {outcome}</div>
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
