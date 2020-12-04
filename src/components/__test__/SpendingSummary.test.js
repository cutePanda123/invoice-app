import React from 'react';
import {shallow} from 'enzyme';
import SpendingSummary from '../SpendingSummary';

const props = {
    income: 1000,
    outcome: 2000
};

describe('test SpendingSummary', () => {
    it('test render function', () => {
        const wrapper = shallow(<SpendingSummary {...props} />);
        expect(wrapper.find('.income div').text() * 1).toEqual(props.income);
        expect(wrapper.find('.outcome div').text() * 1).toEqual(props.outcome);
    });
});