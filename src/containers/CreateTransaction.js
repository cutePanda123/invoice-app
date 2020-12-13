import React from 'react';
import CategoryPicker from '../components/CategoryPicker';
import { Tabs, Tab } from '../components/Tabs';
import EditTransactionForm from '../components/EditTransactionForm';
import withContext from '../WithContext';

class CreateTransaction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTabIndex: 0
        };
    }

    tabChange = (tabIndex) => {
        this.setState({
            activeTabIndex: tabIndex
        });
    }

    getActiveSelectedCategoryType = (tabIndex) => {
        return tabIndex === 0 ? "income" : "outcome";
    }

    render() {
        const { categories } = this.props.data;
        let filteredCategories = Object.keys(categories).filter((cId) => {
            return categories[cId].type === this.getActiveSelectedCategoryType(this.state.activeTabIndex);
        }).map(cId => categories[cId]);
        return (
            <div
                className='create-transaction py-3 px-3 rounded mt-3'
                style={{background: '#fff'}}
            >
                <Tabs
                    activeIndex={this.state.activeTabIndex}
                    onTabChange={this.tabChange}
                >
                    <Tab>Income</Tab>
                    <Tab>Outcome</Tab>
                </Tabs>
                <CategoryPicker
                    categories={filteredCategories}
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

export default withContext(CreateTransaction);