import React from 'react';
import CategoryPicker from '../components/CategoryPicker';
import { Tabs, Tab } from '../components/Tabs';
import EditTransactionForm from '../components/EditTransactionForm';
import { testCategories } from '../testData';

class CreateTransaction extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className='create-transaction py-3 px-3 rounded mt-3'
                style={{background: '#fff'}}
            >
                <Tabs
                    activeIndex={0}
                    onTabChange={() => {}}
                >
                    <Tab>Income</Tab>
                    <Tab>Outcome</Tab>
                </Tabs>
                <CategoryPicker
                    categories={testCategories}
                    onSelectCategory={() => {}}
                />
                <EditTransactionForm
                    onFormSubmit={() => {}}
                    onFormCancel={() => {}}
                />
            </div>
        );
    }
};

export default CreateTransaction;