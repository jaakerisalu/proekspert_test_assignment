import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import '../scss/main.scss';
import { store, persistor } from './main';

import WeatherApp from './components/WeatherApp';
import Loader from "./components/Loader";

const App = () => (
    <div className="app-wrapper">
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<Loader />}>
                <WeatherApp />
            </PersistGate>
        </Provider>
    </div>
);

export default App;
