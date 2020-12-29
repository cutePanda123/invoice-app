import React from 'react';
import axios from 'axios';
import { testItems, testCategories } from '../testData';
import { mount } from 'enzyme';
import App from '../App';
jest.mock('axios')

const waitForAsync = () => new Promise(resolve => setImmediate(resolve));

describe('App test', () => {
    beforeEach(() => {
        axios.get.mockImplementation(jest.fn((url) => {
            if (url.indexOf('categories') > -1) {
                return Promise.resolve({
                    data: testCategories
              });
            }
            if (url.indexOf('transactions?') > -1) {
                return Promise.resolve({
                    data: testItems
                });
            }
            return Promise.resolve({
                data: {
                    ...testItems[0],
                    id: '0'
                }
            });
        }));
        axios.post.mockImplementation(jest.fn((url) => {
            return Promise.resolve({
                data: {
                    ...testItems[0],
                    id: "new_id"
                }
            });
        }));
        axios.put.mockImplementation(jest.fn((url) => {
            return Promise.resolve({
                data: {
                    ...testItems[0],
                    desc: "new_desc"
                }
            });
        }));
        axios.delete.mockImplementation(jest.fn((url) => {
            return Promise.resolve({
                data: {
                    ...testItems[0]
                }
            });
        }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getInitialData test', async () => {
        const wrapper = mount(<App />);
        expect(axios.get).toHaveBeenCalledTimes(2);
        await waitForAsync();
        const state = wrapper.instance().state;
        expect(Object.keys(state.items).length).toEqual(testItems.length);
        expect(Object.keys(state.categories).length).toEqual(testCategories.length);
    });

    it('getEditTransactionData test: create mode with initial data', async () => {
        const wrapper = mount(<App />);
        await waitForAsync();
        await wrapper.instance().actions.getEditTransactionData();
        expect(axios.get).toHaveBeenCalledTimes(2);
    });

    it('getEditTransactionData test: create mode without initial data', async () => {
        const wrapper = mount(<App />);
        await waitForAsync();
        wrapper.setState({
            items: {},
            categories: {}
        });
        await wrapper.instance().actions.getEditTransactionData();
        expect(axios.get).toHaveBeenCalledTimes(3);
    });

    it('getEditTransactionData test: edit mode with initial data', async () => {
        const wrapper = mount(<App />);
        await waitForAsync();
        await wrapper.instance().actions.getEditTransactionData(testItems[0].id);
        expect(axios.get).toHaveBeenCalledTimes(2);
    });

    it('getEditTransactionData test: edit mode without initial data', async () => {
        const wrapper = mount(<App />);
        await waitForAsync();
        await wrapper.instance().actions.getEditTransactionData("new_id");
        expect(axios.get).toHaveBeenCalledTimes(3);
        expect(wrapper.instance().state.items).toHaveProperty("new_id");
    });

    it('createTransaction test with initial data', async () => {
        const wrapper = mount(<App />);
        await waitForAsync();
        await wrapper.instance().actions.createTransaction(testItems[0]);
        expect(axios.post).toHaveBeenCalledTimes(1);
        const state = wrapper.instance().state;
        expect(Object.keys(state.items).length).toEqual(testItems.length + 1);
    });

    it('updateTransaction test with initial data', async () => {
        const wrapper = mount(<App />);
        await waitForAsync();
        await wrapper.instance().actions.updateTransaction(testItems[0]);
        expect(axios.put).toHaveBeenCalledTimes(1);
        const state = wrapper.instance().state;
        expect(Object.keys(state.items).length).toEqual(testItems.length);
    });

    it('deleteTransaction test with initial data', async () => {
        const wrapper = mount(<App />);
        await waitForAsync();
        await wrapper.instance().actions.deleteTransaction(testItems[0]);
        expect(axios.delete).toHaveBeenCalledTimes(1);
        const state = wrapper.instance().state;
        expect(Object.keys(state.items).length).toEqual(testItems.length - 1);
    });
});