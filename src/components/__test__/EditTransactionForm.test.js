import React from 'react';
import { mount } from 'enzyme';
import EditTransactionForm from '../EditTransactionForm';

const editModeProps = {
    transaction: {
        desc: "t",
        date: "2020-10-10",
        amount: 100
    },
    onFormSubmit: jest.fn(),
    onFormCancel: jest.fn()
};

const props = {
    onFormSubmit: jest.fn(),
    onFormCancel: jest.fn()
};

let wrapper = null;
let editModeWrapper = null;

describe('EditTransactionFrom test', () => {
    beforeEach(() => {
        wrapper = mount(<EditTransactionForm {...props} />);
        editModeWrapper = mount(<EditTransactionForm {...editModeProps} />);
    });

    it('snaptshot test', () => {
        expect(wrapper).toMatchSnapshot();
        expect(editModeWrapper).toMatchSnapshot();
    });

    it('should render three input fields', () => {
        const inputs = wrapper.find('.form-group');
        expect(inputs.length).toEqual(3);
        expect(getInputValue('#amount', wrapper)).toEqual('');
        expect(getInputValue('#date', wrapper)).toEqual('');
        expect(getInputValue('#desc', wrapper)).toEqual('');

        expect(getInputValue('#amount', editModeWrapper)).toEqual('100');
        expect(getInputValue('#date', editModeWrapper)).toEqual('2020-10-10');
        expect(getInputValue('#desc', editModeWrapper)).toEqual('t');
    });

    it('should render error message when input is empty', () => {
        const submitButton = wrapper.find('.btn-primary');
        wrapper.find('form').simulate('submit')
        expect(props.onFormSubmit).not.toHaveBeenCalled();
        expect(wrapper.state().errorMessage).not.toEqual('');
    });

    it('should render error message when input dollar amount is negative', () => {
        const submitButton = wrapper.find('.btn-primary');
        setInputValue('#date', wrapper, '2020-10-10');
        setInputValue('#desc', wrapper, 't');
        setInputValue('#amount', wrapper, '-10');
        wrapper.find('form').simulate('submit')
        expect(props.onFormSubmit).not.toHaveBeenCalled();
        expect(wrapper.state().errorMessage).not.toEqual('');
    });

    it('create mode: should trigger onFormSubmit if all input are valid', () => {
        setInputValue('#date', wrapper, '2020-10-10');
        setInputValue('#desc', wrapper, 't');
        setInputValue('#amount', wrapper, '10');
        wrapper.find('form').simulate('submit')
        expect(props.onFormSubmit).toHaveBeenCalledWith({
            date: '2020-10-10',
            desc: 't',
            amount: 10
        }, false);
        expect(wrapper.state().errorMessage).toEqual('');
    });

    it('edit mode: should trigger onFormSubmit if all input are valid', () => {
        setInputValue('#date', editModeWrapper, '2020-10-10');
        setInputValue('#desc', editModeWrapper, 'newTitle');
        setInputValue('#amount', editModeWrapper, '10');
        editModeWrapper.find('form').simulate('submit')
        expect(editModeProps.onFormSubmit).toHaveBeenCalledWith({
            date: '2020-10-10',
            desc: 'newTitle',
            amount: 10
        }, true);
        expect(editModeWrapper.state().errorMessage).toEqual('');
    });

    it('click cancel button should trigger onFormCancel', () => {
        editModeWrapper.find('.btn-secondary').simulate('click')
        expect(editModeProps.onFormCancel).toBeCalled();
    })
});

const getInputValue = (selector, domElement) => {
    return domElement.find(selector).instance().value;
};

const setInputValue = (selector, domElement, newValue) => {
    domElement.find(selector).instance().value = newValue;
};

