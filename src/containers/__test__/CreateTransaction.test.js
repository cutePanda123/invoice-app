import React from 'react';
import { mount } from 'enzyme';
import { Tabs, Tab } from '../../components/Tabs';
import { CreateTransaction } from '../CreateTransaction';
import EditTransactionForm from '../../components/EditTransactionForm';
import CategoryPicker from '../../components/CategoryPicker';
import AppContext from '../../AppContext';
import { testItems, testCategories } from '../../testData';
import Utility from '../../utility';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateTransactionButton from '../../components/CreateTransactionButton';

let wrapper = null;

const fullyLoadedData = {
    items: Utility.flattenArray(testItems),
    categories: Utility.flattenArray(testCategories),
    isLoading: false
};

const emptyData = {
    items: {},
    categories: {},
    isLoading: true
};

const matchWithTransaction = {
    params: {
        transactionId: testItems[0].id
    }
};

const emptyMatch = {
    params: {}
}

const mockActions = {
    getEditTransactionData: jest.fn(),
    createTransaction: jest.fn(),
    updateTransaction: jest.fn()
};



const mockHistory = {
    push: jest.fn()
};

describe('CreateTransaction test', () => {
    beforeEach(() => {
        mockActions.getEditTransactionData.mockReturnValue(Promise.resolve(
            {
                modifiedTransaction: testItems[0],
                categories: Utility.flattenArray(testCategories)
            }
        ));
        mockActions.createTransaction.mockReturnValue(Promise.resolve(''));
        mockActions.updateTransaction.mockReturnValue(Promise.resolve(''));
    });
    it('initial data: snapshot test', () => {
        mockActions.getEditTransactionData().then(data => {

        });
        wrapper = mount(
            <CreateTransaction
                data={emptyData}
                actions={mockActions}
                history={mockHistory}
                match={emptyMatch}
            />
        )
        expect(wrapper).toMatchSnapshot();        
    });

    it('loaded data: snapshot test', () => {
        mockActions.getEditTransactionData().then(data => {

        });
        wrapper = mount(
            <CreateTransaction
                data={fullyLoadedData}
                actions={mockActions}
                history={mockHistory}
                match={matchWithTransaction}
            />
        )
        expect(wrapper).toMatchSnapshot();        
    });

    // it('should render correct components', () => {
    //     expect(wrapper.find(Tabs).length).toEqual(1);
    //     expect(wrapper.find(Tab).length).toEqual(2);
    //     expect(wrapper.find(CategoryPicker).length).toEqual(1);
    //     expect(wrapper.find(EditTransactionForm).length).toEqual(1);
    // });
});


