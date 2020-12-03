import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';

const CreateTransactionButton = ({ onCreateTransaction }) => {
    return (
        <button 
            className="btn btn-primary btn-block d-flex justify-content-center align-items-center"
            onClick={(e) => {
                onCreateTransaction()
            }}    
        >
            <Ionicon
                className="rounded-circle"
                fontSize="30px"
                color="#fff"
                icon="ios-add-circle"
            />
            Create a new transaction
        </button>
    );
}

CreateTransactionButton.propTypes = {
    onCreateTransaction: PropTypes.func.isRequired
}

CreateTransactionButton.defaultProps = {
    onCreateTransaction: () => {
        console.log("create a transaction button");
    }
}

export default CreateTransactionButton;