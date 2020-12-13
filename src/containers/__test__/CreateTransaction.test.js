import React from 'react';
import { mount } from 'enzyme';
import { Tabs, Tab } from '../../components/Tabs';
import CreateTransaction from '../CreateTransaction';
import EditTransactionForm from '../../components/EditTransactionForm';
import CategoryPicker from '../../components/CategoryPicker';
import AppContext from '../../AppContext';
import { testItems, testCategories } from '../../testData';
import Utility from '../../utility';
import { BrowserRouter as Router } from 'react-router-dom';

let wrapper = null;

describe('CreateTransaction test', () => {
    beforeEach(() => {
        wrapper = wrapper = mount(
            <Router>
                <AppContext.Provider value={
                    {
                        state: {
                            items: Utility.flattenArray(testItems),
                            categories: Utility.flattenArray(testCategories)
                        }
                    }
                }>
                    <CreateTransaction />
                </AppContext.Provider>
            </Router>
        );
    });

    it('snapshot test', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct components', () => {
        expect(wrapper.find(Tabs).length).toEqual(1);
        expect(wrapper.find(Tab).length).toEqual(2);
        expect(wrapper.find(CategoryPicker).length).toEqual(1);
        expect(wrapper.find(EditTransactionForm).length).toEqual(1);
    });
});


