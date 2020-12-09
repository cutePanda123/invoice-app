import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';

class CategoryPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategoryId: props.selectedCategory && props.selectedCategory.id
        };
    }

    selectCategory = (event, category) => {
        this.setState({
            selectedCategoryId: category.id
        });
        this.props.onSelectCategory(category);
        event.preventDefault();
    }

    render() {
        const { categories } = this.props;
        const { selectedCategoryId } = this.state;
        return (
            <div className="category-picker-component">
                <div className="row">
                    {
                        categories.map((category, index) => {
                            const activeClassName = selectedCategoryId === category.id ? 
                                "category-item col-3 active" : "category-item col-3";
                            return (
                                <div
                                    className={activeClassName}
                                    key={index}
                                    onClick={(event) => {
                                        this.selectCategory(event, category);
                                    }}
                                >
                                    <Ionicon 
                                        className="rounded-circle"
                                        fontSize="50px"
                                        color="#555"
                                        icon={category.iconName}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

CategoryPicker.propTypes = {
    categories: PropTypes.array.isRequired,
    onSelectCategory: PropTypes.func.isRequired,
    selectedCategory: PropTypes.object
};

export default CategoryPicker;

