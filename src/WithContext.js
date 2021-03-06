import React from 'react';
import AppContext from './AppContext';

const withContext = (Component) => {
    return class extends React.Component {
        render() {
            return (
                <AppContext.Consumer>
                    {
                        ({ state, actions }) => {
                            return (
                                <Component {...this.props} data={state} actions={actions}/>
                            );
                        }
                    }

                </AppContext.Consumer>
            );
        }
    }
}

export default withContext;