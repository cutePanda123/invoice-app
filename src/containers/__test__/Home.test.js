import React from 'react';
import { mount } from 'enzyme';
import { Home } from '../Home';
import TransactionList from '../../components/TransactionList';
import { Tabs } from '../../components/Tabs';
import Utility from '../../utility';
import MonthPicker from '../../components/MonthPicker';
import CreateTransactionButton from '../../components/CreateTransactionButton';
import { testItems, testCategories } from '../../testData'; 
import Loader from '../../components/Loader';

let wrapper = null;
const delectTransactionFun = jest.fn();

const loadedData = {
    isLoading: false,
    items: Utility.flattenArray(testItems),
    categories: Utility.flattenArray(testCategories),
    currentDate: {
        year: 2020,
        month: 12
    }
};

const loadingData = {
    isLoading: true,
    currentDate: {
        year: 2020,
        month: 12
    }
};

const match = {};
const history = {
    push: jest.fn()
};

const actions = {
    getInitialData: jest.fn(),
    deleteTransaction: jest.fn(),
    updateDate: jest.fn()
};

describe('Loaded data Home test', () => {
    beforeEach(() => {
        wrapper = mount(
            <Home 
                actions={actions}
                history={history}
                match={match}
                data={loadedData}
            />
        );
        
    });

    it('snapshot test', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct dom', () => {
        expect(wrapper.find(Loader).length).toEqual(0);
        expect(wrapper.find(TransactionList).length).toEqual(1);
        expect(wrapper.find(Tabs).props().activeIndex).toEqual(0);
        expect(wrapper.find(MonthPicker).props().year).toEqual(loadedData.currentDate.year);
        expect(wrapper.find(MonthPicker).props().month).toEqual(loadedData.currentDate.month);
        expect(wrapper.find(TransactionList).props().items).not.toBeNaN();
    });

    it('should switch tab when click tab', () => {
        wrapper.find('.nav-item a').first().simulate('click');
        expect(wrapper.find(Tabs).props().activeIndex).toEqual(0);
    });

    it('should change date tab when click a new month', () => {
        wrapper.find('.dropdown-toggle').simulate('click');
        wrapper.find('.months-range .dropdown-item').at(8).simulate('click');
        expect(wrapper.find(MonthPicker).props().month).toEqual(12);
    });

    it('should throw no exception when click create button', () => {
        wrapper.find(CreateTransactionButton).simulate('click');
        expect(history.push).toHaveBeenCalled();
    });

    it('should delete a transaction when click delete button', () => {
        wrapper.find('.delete-button').first().simulate('click');
        expect(delectTransactionFun).toHaveBeenCalled;
    });
});

describe('Loading data Home test', () => {
    beforeEach(() => {
        wrapper = mount(
            <Home 
                actions={actions}
                history={history}
                match={match}
                data={loadingData}
            />
        );
    });

    it('snapshot test', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct dom', () => {
        expect(wrapper.find(Loader).length).toEqual(1);
        expect(wrapper.find(TransactionList).length).toEqual(0);
        expect(wrapper.find(Tabs).length).toEqual(0);
        expect(wrapper.find(MonthPicker).props().year).toEqual(loadedData.currentDate.year);
        expect(wrapper.find(MonthPicker).props().month).toEqual(loadedData.currentDate.month);
        expect(wrapper.find(CreateTransactionButton).length).toEqual(0);
    });

    it('should call data fetching method', () => {
        wrapper = mount(
            <Home 
                actions={actions}
                history={history}
                match={match}
                data={loadingData}
            />
        );
        
        expect(actions.getInitialData).toHaveBeenCalled();
    });
});