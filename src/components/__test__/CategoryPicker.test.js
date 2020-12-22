import React from 'react';
import { mount } from 'enzyme';
import CategoryPicker from '../CategoryPicker';
import Ionicon from 'react-ionicons';

export const categories = [
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

let props = {
    categories,
    onSelectCategory: jest.fn()
};

let propsWithSelectedCategory = {
    categories,
    onSelectCategory: jest.fn(),
    selectedCategory: categories[0]
};
let wrapper = null;

describe('CategoryPicker test', () => {
    it('snapshot test', () => {
        wrapper = mount(<CategoryPicker {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('render should have correct number of items', () => {
        wrapper = mount(<CategoryPicker {...props} />);
        expect(wrapper.find('.category-item').length).toEqual(categories.length);
        expect(wrapper.find('.category-item.active').length).toEqual(0);
        const firstIcon = wrapper.find('.category-item').first().find(Ionicon);
        expect(firstIcon.length).toEqual(1);
        expect(firstIcon.props().icon).toEqual(categories[0].iconName);
    });

    it('render with selected category should have an active item', () => {
        wrapper = mount(<CategoryPicker {...propsWithSelectedCategory} />);
        expect(wrapper.find('.category-item.active').length).toEqual(1);
    });

    it('select a category should trigger callback and change the active item', () => {
        wrapper = mount(<CategoryPicker {...propsWithSelectedCategory} />);
        wrapper.find('.category-item').at(1).simulate('click');
        expect(propsWithSelectedCategory.onSelectCategory).toHaveBeenCalledWith(categories[1]);
    });
});