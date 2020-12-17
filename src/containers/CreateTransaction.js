import React from 'react';
import CategoryPicker from '../components/CategoryPicker';
import { Tabs, Tab } from '../components/Tabs';
import EditTransactionForm from '../components/EditTransactionForm';
import withContext from '../WithContext';
import { withRouter } from 'react-router-dom';

class CreateTransaction extends React.Component {
    constructor(props) {
        super(props);
        const { items, categories } = this.props.data;
        let filteredCategories = Object.keys(this.props.data.categories).filter((cId) => {
            return this.props.data.categories[cId].type === this.getActiveSelectedCategoryType(0);
        }).map(cId => this.props.data.categories[cId]);
        const editTransaction = this.getEditTransaction();
        let tabIndex = 0;
        let curCategory = filteredCategories[0];
        if (editTransaction && editTransaction.id) {
            curCategory = categories[items[editTransaction.id].categoryId];
            tabIndex = curCategory.type === "income" ? 0 : 1;
        }
        this.state = {
            activeTabIndex: tabIndex,
            selectedCategory: curCategory
        };
    }

    componentDidMount() {
        const { transactionId } = this.props.match.params;
        this.props.actions.getEditTransactionData(transactionId).then(data => {
            const {modifiedTransaction, categories} = data;
            let filteredCategories = Object.keys(categories).filter((cId) => {
                return categories[cId].type === this.getActiveSelectedCategoryType(0);
            }).map(cId => categories[cId]);

            let tabIndex = 0;
            let curCategory = filteredCategories[0];
            if (transactionId) {
                curCategory = categories[modifiedTransaction.categoryId];
                tabIndex = curCategory.type === "income" ? 0 : 1;
            }
            this.setState({
                activeTabIndex: tabIndex,
                selectedCategory: curCategory
            });
        });
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
            this.props.actions.createTransaction({...formData, categoryId: this.state.selectedCategory.id}).then(() => {
                this.props.history.push('/');
            });
        } else {
            this.props.actions.updateTransaction({...formData, categoryId: this.state.selectedCategory.id}).then(() => {
                this.props.history.push('/');
            });
        }
    }

    selectCategory = (category) => {
        this.setState({
            selectedCategory: category
        });
    }

    getEditTransaction = () => {
        const { items } = this.props.data;
        const {transactionId} = this.props.match.params;
        const editTransaction = (transactionId && items[transactionId]) ? items[transactionId] : {}
        return editTransaction;
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
                    selectedCategory={this.state.selectedCategory}
                />
                <EditTransactionForm
                    onFormSubmit={this.finishSubmit}
                    onFormCancel={this.cancelSubmit}
                    transaction={this.getEditTransaction()}
                />
            </div>
        );
    }
};

export default withRouter(withContext(CreateTransaction));