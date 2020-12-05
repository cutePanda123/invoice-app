import React from 'react';
import { shallow } from 'enzyme';
import ViewTab from '../ViewTab';
import Utility from '../../utility';

const props = {
    activeViewName: Utility.LIST_VIEW_NAME,
    onClickTab: jest.fn()
}

let wrapper = null;

describe('ViewTab test', () => {
    beforeEach(() => {
        wrapper = shallow(<ViewTab {...props} />);
    });

    it('snapshot test', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct number of tabs', () => {
        const tabs = wrapper.find('.nav-item');
        expect(tabs.length).toEqual(2);
    });

    it('should trigger correct callback on list view', () => {
        const tab1 = wrapper.find('.nav-item a').first();
        tab1.simulate('click', { preventDefault: () => {} });
        expect(props.onClickTab).toHaveBeenCalledWith(Utility.LIST_VIEW_NAME);
    });

    it('should trigger correct callback on chart view', () => {
        const tab = wrapper.find('.nav-item a').last();
        tab.simulate('click', { preventDefault: () => {} });
        expect(props.onClickTab).toHaveBeenCalledWith(Utility.CHART_VIEW_NAME);
    });
});