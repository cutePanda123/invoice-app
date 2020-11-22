import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';
import Constants from '../utilility';

const generateTabClassName = (curTabName, activeViewName) => {
    return (curTabName === activeViewName) ? "nav-link active" : "nav-link";
}

const ViewTab = ({activeViewName, onClickTab}) => {
    return (
        <ul className="nav nav-tabs nav-fill my-4">
            <li className="nav-item">
                <a 
                    className={generateTabClassName(Constants.LIST_VIEW_NAME, activeViewName)}
                    href="#"
                    onClick={(event) => {
                        event.preventDefault();
                        onClickTab(Constants.LIST_VIEW_NAME);
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
                    className={generateTabClassName(Constants.CHART_VIEW_NAME, activeViewName)}
                    href="#"
                    onClick={(event) => {
                        event.preventDefault();
                        onClickTab(Constants.CHART_VIEW_NAME);
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