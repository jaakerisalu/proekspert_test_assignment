import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import weatherReducer from './ducks/weather';

import App from './App';

const DEBUG = process.env.NODE_ENV !== 'production';

function configureStore(reducer) {
    /* eslint-disable */
    const composeEnhancers =
        typeof window === 'object' && DEBUG &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
    /* eslint-enable */

    const middleware = [];

    if (!DEBUG) {
        middleware.push(thunk);
    } else {
        const logger = createLogger({
            collapsed: true,
            duration: true,
        });
        middleware.push(thunk, logger);
    }

    const enhancer = composeEnhancers(
        applyMiddleware(...middleware),
    );

    return createStore(reducer, enhancer);
}

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet, // As far as I can tell we don't need to merge on rehydrate
};

const persistedReducer = persistReducer(persistConfig, weatherReducer);

export const store = configureStore(persistedReducer);
export const persistor = persistStore(store);


function init() {
    const container = document.getElementById('react-container');
    if (!container) {
        return;
    }

    const app = React.createElement(App);
    ReactDOM.render(app, container);
}

export { init }; // eslint-disable-line import/prefer-default-export
