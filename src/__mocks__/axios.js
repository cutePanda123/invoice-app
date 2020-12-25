import {testItems, testCategories} from '../testData';

export default {
    get: jest.fn((url) => {
        return Promise.resolve({
            data: testItems
        });
    })
};