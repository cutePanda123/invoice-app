import React from 'react';
import PropTypes from 'prop-types';

const SpendingSummary = ({income, outcome}) => {
    return (
        <div className="containers">
            <div className="row justify-content-end">
                <div className="col-2">Income: {income}</div>
                <div className="col-2">Outcome: {outcome}</div>
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
