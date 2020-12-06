import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import MonthPicker from '../MonthPicker';

let props = {
    year: 2020,
    month: 8,
    onDateChange: jest.fn()
};

let wrapper = null;

describe('MonthPicker test', () => {
    beforeEach(() => {
        wrapper = mount(<MonthPicker {...props} />);
    });

    it('snapshot test', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct year and month', () => {
        expect(wrapper.find('.dropdown-toggle').first().text()).toEqual('08/2020');
        expect(wrapper.find('dropdown-menu').length).toEqual(0);
        expect(wrapper.state('isOpen')).toEqual(false);
    });

    it('should show dropdown list on dropdown toggle click', () => {
        wrapper.find('.dropdown-toggle').simulate('click');
        expect(wrapper.state('isOpen')).toEqual(true);
        expect(wrapper.find('.dropdown-menu').length).toEqual(1);
        expect(wrapper.find('.years-range .dropdown-item').length).toEqual(9);
        expect(wrapper.find('.months-range .dropdown-item').length).toEqual(12);
        expect(wrapper.find('.years-range .active').text() * 1).toEqual(2020);
        expect(wrapper.find('.months-range .active').text()).toEqual("08");
        expect(wrapper.find('.years-range .dropdown-item').first().text()).toEqual("2016");
        expect(wrapper.find('.months-range .dropdown-item').first().text()).toEqual("01");
    });

    it('click year should trigger correct handler', () => {
        wrapper.find('.dropdown-toggle').simulate('click');
        wrapper.find('.years-range .dropdown-item')
            .first()
            .simulate('click', { 
                preventDefault: () => {},
                stopPropagation: () => {}
            });
        expect(props.onDateChange).toHaveBeenCalledWith(2016, 8);
    });

    it('click month should trigger correct handler', () => {
        wrapper.find('.dropdown-toggle').simulate('click');
        wrapper.find('.months-range .dropdown-item')
            .first()
            .simulate('click', { 
                preventDefault: () => {},
                stopPropagation: () => {}
            });
        expect(props.onDateChange).toHaveBeenCalledWith(2020, 1);
        expect(wrapper.state('isOpen')).toEqual(false);
    });

    it('click dropdown itself cannot close the dropdown if it is open', () => {
        let clickEventCallback = null;
        document.addEventListener = jest.fn((event, cb) => {
            clickEventCallback = cb;
        });
        let localWrapper = mount(<MonthPicker {...props} />);
        localWrapper.find('.dropdown-toggle').simulate('click');
        clickEventCallback({
            target: ReactDOM.findDOMNode(localWrapper.instance())
        });
        expect(localWrapper.state('isOpen')).toEqual(true);
    });

    it('click document can close the dropdown if it is open', () => {
        let clickEventCallback = null;
        document.addEventListener = jest.fn((event, cb) => {
            clickEventCallback = cb;
        });
        let localWrapper = mount(<MonthPicker {...props} />);
        localWrapper.find('.dropdown-toggle').simulate('click');
        clickEventCallback({
            target: document
        });
        expect(localWrapper.state('isOpen')).toEqual(false);
    });
});