import { testItems, testCategories } from '../testData';

export default {
    get: jest.fn((url) => {
        console.log("log output from mock axios!!!!!!!!!");
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
                id: 'testId'
            }
        });
    })
};