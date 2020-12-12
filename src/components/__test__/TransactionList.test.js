import React from 'react';
import { shallow } from 'enzyme';
import Ionicon from 'react-ionicons';
import TransactionList from '../TransactionList';
import { testItems as items, testCategories as categories } from '../../testData';

const itemWithCategories = items.map((item) => {
    item.category = categories[item.categoryId];
    return item;
});

const props = {
    items: itemWithCategories,
    onModifyItem: jest.fn(),
    onDeleteItem: jest.fn()
};

let wrapper = null;

describe('TransactionList test', () => {
    beforeEach(() => {
        wrapper = shallow(<TransactionList {...props} />);
    });

    it('snapshot test', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct number of items', () => {
        expect(wrapper.find('.list-group-item').length).toEqual(itemWithCategories.length);
    });

    it('should render correct icons for each item', () => {
        const icons = wrapper.find('.list-group-item').first().find(Ionicon);
        expect(icons.length).toEqual(3);
        expect(icons.first().props().icon)
            .toEqual(itemWithCategories[0].category.iconName);
    });

    it('should trigger correct callback', () => {
        const firstItem = wrapper.find('.list-group-item').first();
        firstItem.find('a').first().simulate('click');
        expect(props.onModifyItem).toHaveBeenCalledWith(itemWithCategories[0]);

        firstItem.find('a').last().simulate('click');
        expect(props.onDeleteItem).toHaveBeenCalledWith(itemWithCategories[0]);
    });
});

