import React from 'react';
import { mount } from 'enzyme';
import Home from '../Home';
import TransactionList from '../../components/TransactionList';
import { Tabs, Tab} from '../../components/Tabs';
import Utility from '../../utility';
import MonthPicker from '../../components/MonthPicker';
import CreateTransactionButton from '../../components/CreateTransactionButton';

let wrapper = null;

describe('Home test', () => {
    beforeEach(() => {
        wrapper = mount(<Home />);
    });

    it('snapshot test', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct dom', () => {
        const curDate = Utility.parseYearAndMonth('2020/12/31');
        expect(wrapper.find(TransactionList).length).toEqual(1);
        expect(wrapper.find(Tabs).props().activeIndex).toEqual(0);
        expect(wrapper.find(MonthPicker).props().year).toEqual(curDate.year);
        expect(wrapper.find(MonthPicker).props().month).toEqual(curDate.month);
        expect(wrapper.find(TransactionList).props().items).not.toBeNaN();
    });

    it('should switch tab when click tab', () => {
        wrapper.find('.nav-item a').first().simulate('click');
        expect(wrapper.find(Tabs).props().activeIndex).toEqual(0);
    });

    it('should change date tab when click a new month', () => {
        wrapper.find('.dropdown-toggle').simulate('click');
        wrapper.find('.months-range .dropdown-item').at(8).simulate('click');
        expect(wrapper.find(MonthPicker).props().month).toEqual(9);
    });

    it('should change date tab when click a new month', () => {
        wrapper.find('.dropdown-toggle').simulate('click');
        wrapper.find('.months-range .dropdown-item').at(8).simulate('click');
        expect(wrapper.find(MonthPicker).props().month).toEqual(9);
    });

    it('should create a transaction when click create button', () => {
        const oldTransactonNumber = wrapper.state('items').length;
        wrapper.find(CreateTransactionButton).simulate('click');
        expect(wrapper.state('items').length).toEqual(oldTransactonNumber + 1);
    });

    it('should delete a transaction when click delete button', () => {
        const oldTransactonNumber = wrapper.state('items').length;
        wrapper.find('.delete-button').first().simulate('click');
        expect(wrapper.state('items').length).toEqual(oldTransactonNumber - 1);
    });
});