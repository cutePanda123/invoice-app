import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';
import Utility from '../utilility';

const generateTabClassName = (curTabName, activeViewName) => {
    return (curTabName === activeViewName) ? "nav-link active" : "nav-link";
}

const ViewTab = ({activeViewName, onClickTab}) => {
    return (
        <ul className="nav nav-tabs nav-fill my-4">
            <li className="nav-item">
                <a 
                    className={generateTabClassName(Utility.LIST_VIEW_NAME, activeViewName)}
                    href="#"
                    onClick={(event) => {
                        event.preventDefault();
                        onClickTab(Utility.LIST_VIEW_NAME);
                    }}
                >
                    <Ionicon
                        className="rounded-circle mr-2"
                        fontSize="25px"
                        color={"#007bff"}
                        icon="ios-paper"
                    />
                    List View
                </a>
            </li>
            <li className="nav-item">
                <a
                    className={generateTabClassName(Utility.CHART_VIEW_NAME, activeViewName)}
                    href="#"
                    onClick={(event) => {
                        event.preventDefault();
                        onClickTab(Utility.CHART_VIEW_NAME);
                    }}
                >
                    <Ionicon
                        className="rounded-circle mr-2"
                        fontSize="25px"
                        color={"#007bff"}
                        icon="ios-pie"
                    />
                    Chart View
                </a>
            </li>
        </ul>
    );
}

ViewTab.propTypes = {
    activeViewName: PropTypes.string.isRequired,
    onClickTab: PropTypes.func.isRequired
}

export default ViewTab;