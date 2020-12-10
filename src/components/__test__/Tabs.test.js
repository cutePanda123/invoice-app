import React from 'react';
import { shallow } from 'enzyme';
import { Tabs, Tab } from '../Tabs';
import Utility from '../../utility';

const props = {
    activeIndex: 0,
    onTabChange: jest.fn()
}

let wrapper = null;

describe('Tabs test', () => {
    beforeEach(() => {
        wrapper = shallow(
        <Tabs {...props}>
                <Tab>tab1</Tab>
                <Tab>tab2</Tab>
            </Tabs>);
    });

    it('snapshot test', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct number of tabs', () => {
        const tabs = wrapper.find(Tab);
        expect(tabs.length).toEqual(2);
    });

    it('should trigger correct callback on list view', () => {
        const tab1 = wrapper.find('.nav-item a').first();
        tab1.simulate('click', { preventDefault: () => {} });
        expect(props.onTabChange).toHaveBeenCalledWith(0);
    });

    it('should trigger correct callback on chart view', () => {
        const tab = wrapper.find('.nav-item a').last();
        tab.simulate('click', { preventDefault: () => {} });
        expect(props.onTabChange).toHaveBeenCalledWith(1);
    });
});