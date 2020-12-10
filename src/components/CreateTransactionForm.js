import React from 'react';
import PropTyes from 'prop-types';
import CreateTransactionButton from './CreateTransactionButton';

class CreateTransactionForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: ''
        };
    }

    submitForm = (event) => {

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event) => {this.submitForm(event)}} noValidate>
                <div className="form-group">
                    <label for="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="titleHelp"
                        placeholder="Enter title"
                        ref={(inputValue) => {
                            this.titleInput = inputValue;
                        }}
                    />
                    <small id="titleHelp" className="form-text text-muted">Title for your transaction.</small>
                </div>
                <div className="form-group">
                    <label for="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="Price"
                        defaultValue={this.props.transaction.price}
                        ref={(inputValue) => {
                            this.priceInput = inputValue;
                        }}
                    />
                    <small id="priceHelp" className="form-text text-muted">Price for your transaction.</small>
                </div>
                <div className="form-group">
                    <label for="date">Date</label>
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