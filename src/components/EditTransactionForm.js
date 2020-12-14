import React from 'react';
import PropTyes from 'prop-types';

class CreateTransactionForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: ''
        };
    }

    submitForm = (event) => {
        const {transaction, onFormSubmit} = this.props;
        const amount = this.amountInput.value.trim() * 1;
        const date = this.dateInput.value.trim();
        const title = this.titleInput.value.trim();
        const isEditMode = transaction.desc;

        if (amount && date && title) {
            if (amount < 0) {
                this.setState({
                    errorMessage: 'dollar amount cannot be negative'
                });
            } else {
                onFormSubmit({...transaction, amount, date, desc: title}, isEditMode)
            }
        } else {
            this.setState({
                errorMessage: 'input filed cannot be empty'
            });
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event) => {this.submitForm(event)}} noValidate>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="titleHelp"
                        placeholder="Enter title"
                        ref={(inputValue) => {
                            this.titleInput = inputValue;
                        }}
                        defaultValue={this.props.transaction.desc}
                    />
                    <small id="titleHelp" className="form-text text-muted">Title for your transaction.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Dollar Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        placeholder="Dollar Amount"
                        defaultValue={this.props.transaction.amount}
                        ref={(inputValue) => {
                            this.amountInput = inputValue;
                        }}
                    />
                    <small id="amountHelp" className="form-text text-muted">Dollar amount for your transaction.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        placeholder="Date"
                        defaultValue={this.props.transaction.date}
                        ref={(inputValue) => {
                            this.dateInput = inputValue;
                        }}
                    />
                    <small id="dateHelp" className="form-text text-muted">Date for your transaction.</small>
                </div> 
                <button
                    type="submit"   
                    className="btn btn-primary"
                >Submit</button>
                <button
                    className="btn btn-secondary"
                    onClick={this.props.onFormCancel}
                >Cancel</button>
                {
                    this.state.errorMessage !== '' && 
                    <div className="alert alert-danger mt-5" role="alert">
                        {this.state.errorMessage}
                    </div>
                }
            </form>
        );
    }
}

CreateTransactionForm.propTypes = {
    transaction: PropTyes.object.isRequired,
    onFormSubmit: PropTyes.func.isRequired,
    onFormCancel: PropTyes.func.isRequired
}

CreateTransactionForm.defaultProps = {
    transaction: {}
}


export default CreateTransactionForm;