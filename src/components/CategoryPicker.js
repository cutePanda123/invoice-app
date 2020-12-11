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
                            const iconColor = (category.id === selectedCategoryId) ? '#fff' : '#555';
                            const backColor = (category.id === selectedCategoryId) ? '#347eff' : '#efefef';
                            const activeClassName = selectedCategoryId === category.id ? 
                                "category-item col-3 active" : "category-item col-3";
                            return (
                                <div
                                    className={activeClassName}
                                    key={index}
                                    onClick={(event) => {
                                        this.selectCategory(event, category);
                                    }}
                                    role='button'
                                    style={{textAlign: 'center'}}
                                >
                                    <Ionicon 
                                        className="rounded-circle"
                                        style={
                                            {
                                                backgroundColor: backColor,
                                                padding: '5px'
                                            }
                                        }
                                        fontSize="50px"
                                        color={iconColor}
                                        icon={category.iconName}
                                    />
                                    <p>{category.name}</p>
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
    onSelectCategory: PropTypes.func.isRequired
};

export default CategoryPicker;

