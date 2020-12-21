import React from 'react';
import { mount } from 'enzyme';
import { Tabs, Tab } from '../../components/Tabs';
import { CreateTransaction } from '../CreateTransaction';
import EditTransactionForm from '../../components/EditTransactionForm';
import CategoryPicker from '../../components/CategoryPicker';
import { testItems, testCategories } from '../../testData';
import Utility from '../../utility';
import Loader from '../../components/Loader';

let dataLoadedUI = null;
let dataLoadingUI = null;

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

const mockActionsForLoadedUi = {
    getEditTransactionData: jest.fn(),
    createTransaction: jest.fn(),
    updateTransaction: jest.fn()
};

const mockActionsForLoadingUi = {
    getEditTransactionData: jest.fn(),
    createTransaction: jest.fn(),
    updateTransaction: jest.fn()
};


const mockHistory = {
    push: jest.fn()
};

describe('CreateTransaction test: create new transaction', () => {
    beforeEach(() => {
        mockActionsForLoadingUi.getEditTransactionData.mockReturnValue(Promise.resolve(
            {
                modifiedTransaction: testItems[0],
                categories: Utility.flattenArray(testCategories)
            }
        ));
        mockActionsForLoadingUi.createTransaction.mockReturnValue(Promise.resolve(''));
        mockActionsForLoadingUi.updateTransaction.mockReturnValue(Promise.resolve(''));
    });
    it('initial data: snapshot test', () => {
        dataLoadingUI = mount(
            <CreateTransaction
                data={emptyData}
                actions={mockActionsForLoadingUi}
                history={mockHistory}
                match={emptyMatch}
            />
        )
        expect(dataLoadingUI).toMatchSnapshot();        
    });

    it('should render correct components if data is not ready', () => {
        expect(dataLoadingUI.find(Loader).length).toEqual(1);
        expect(dataLoadingUI.find(Tab).length).toEqual(0);
        expect(dataLoadingUI.find(CategoryPicker).length).toEqual(0);
        expect(dataLoadingUI.find(EditTransactionForm).length).toEqual(0);
    });
});

describe('CreateTransaction test: edit a transaction', () => {
    beforeEach(() => {
        mockActionsForLoadedUi.getEditTransactionData.mockReturnValue(Promise.resolve(
            {
                modifiedTransaction: testItems[0],
                categories: Utility.flattenArray(testCategories)
            }
        ));
        mockActionsForLoadedUi.createTransaction.mockReturnValue(Promise.resolve(''));
        mockActionsForLoadedUi.updateTransaction.mockReturnValue(Promise.resolve(''));
    });

    it('loaded data: snapshot test', () => {
        dataLoadedUI = mount(
            <CreateTransaction
                data={fullyLoadedData}
                actions={mockActionsForLoadedUi}
                history={mockHistory}
                match={matchWithTransaction}
            />
        );
        expect(dataLoadedUI).toMatchSnapshot();    
    });

    it('should render correct components if data is ready', () => {
        expect(dataLoadedUI.find(Loader).length).toEqual(0);
        expect(dataLoadedUI.find(Tab).length).toEqual(2);
        expect(dataLoadedUI.find(CategoryPicker).length).toEqual(1);
        expect(dataLoadedUI.find(Tabs).props().activeIndex).toEqual(1);
        expect(dataLoadedUI.find(EditTransactionForm).length).toEqual(1);
        expect(dataLoadedUI.find(EditTransactionForm).props().transaction).toEqual(testItems[0]);
    });

    it('should call data fetching method with correct parameter if transaction id presents', () => {
        dataLoadedUI = mount(
            <CreateTransaction
                data={fullyLoadedData}
                actions={mockActionsForLoadedUi}
                history={mockHistory}
                match={matchWithTransaction}
            />
        );
        expect(mockActionsForLoadedUi.getEditTransactionData)
            .toHaveBeenCalledWith(matchWithTransaction.params.transactionId);
    });
});





