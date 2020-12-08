import React from 'react';

const CreateTransaction = ({ match }) => {
    return (
        <h1>Create a New Transaction: {match.params.id} </h1>
    );
};

export default CreateTransaction;