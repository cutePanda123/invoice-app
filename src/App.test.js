import React from 'react';
import mockAxios from './__mocks__/axios';
import { testItems, testCategories } from './testData';
import { mount } from 'enzyme';
import App from './App';

//const waitForAsync = () => new Promise(resolve => setImmediate(resolve));

describe('App test', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getInitialData test', async () => {
        const wrapper = mount(<App />);
        expect(mockAxios.get).toHaveBeenCalledTimes(2);
    });
});