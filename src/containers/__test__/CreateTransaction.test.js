import React from 'react';
import { mount } from 'enzyme';
import { Tabs, Tab } from '../../components/Tabs';
import CreateTransaction from '../CreateTransaction';
import EditTransactionForm from '../../components/EditTransactionForm';
import CategoryPicker from '../../components/CategoryPicker';

const categories = [
    {
        "id": 1,
        "name": "travel",
        "type": "outcome",
        "iconName": "ios-plane"
    },
    {
        "id": 2,
        "name": "investement",
        "type": "income",
        "iconName": "logo-yen"
    }
];

let wrapper = null;

describe('CreateTransaction test', () => {
    beforeEach(() => {
        wrapper = mount(<CreateTransaction />);
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


