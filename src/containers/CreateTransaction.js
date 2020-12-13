import React from 'react';
import CategoryPicker from '../components/CategoryPicker';
import { Tabs, Tab } from '../components/Tabs';
import EditTransactionForm from '../components/EditTransactionForm';
import withContext from '../WithContext';
import { withRouter } from 'react-router-dom';

class CreateTransaction extends React.Component {
    constructor(props) {
        super(props);

        let filteredCategories = Object.keys(this.props.data.categories).filter((cId) => {
            return this.props.data.categories[cId].type === this.getActiveSelectedCategoryType(0);
        }).map(cId => this.props.data.categories[cId]);

        this.state = {
            activeTabIndex: 0,
            selectedCategory: filteredCategories[0]
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

    cancelSubmit = () => {
        this.props.history.push('/');
    }

    finishSubmit= (formData, isEditMode) => {
        if (!isEditMode) {
            this.props.actions.createTransaction({...formData, categoryId: this.state.selectedCategory.id});
            this.props.history.push('/');
        } else {
            // edit a transaction 
        }
    }

    selectCategory = (category) => {
        this.setState({
            selectedCategory: category
        });
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
                    onSelectCategory={this.selectCategory}
                    selectedCategoryId={this.state.selectedCategory.id}
                />
                <EditTransactionForm
                    onFormSubmit={this.finishSubmit}
                    onFormCancel={this.cancelSubmit}
                />
            </div>
        );
    }
};

export default withRouter(withContext(CreateTransaction));