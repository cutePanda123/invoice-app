import React from 'react';
import { shallow } from 'enzyme';
import TransactionList from '../TransactionList';
import { items, categories } from '../../containers/Home';

const itemWithCategories = items.map((item) => {
    item.category = categories[item.categoryId];
    return item;
});

const props = {
    items: itemWithCategories,
    onModifyItem: () => {},
    onDeleteItem: () => {}
};

let wrapper = null;

describe('TransactionList test', () => {
    beforeEach(() => {
        wrapper = shallow(<TransactionList {...props} />);
    });

    it('snapshot test', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

