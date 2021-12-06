import React from 'react';
import ReactDOM from 'react-dom';
import Parse from 'parse';
import { Provider } from 'mobx-react';
import { create, persist } from 'mobx-persist';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { RootStore } from './stores';

Parse.initialize(process.env.REACT_APP_APPLICATION_ID);
Parse.serverURL = process.env.REACT_APP_SERVER_URL;

const PERSIST_STORE = 'persistRootStore';

if (process.env.NODE_ENV === 'production') {
    runProduction();
} else {
    runDevelopment();
}

function runProduction() {
    const rootStore = new RootStore();
    renderApp(rootStore);
}

interface ReactHotReload {
    accept: (paths: String[], action: () => void) => void;
}

interface NodeModuleWithReactHotReload extends NodeModule {
    hot: ReactHotReload;
}

function runDevelopment() {
    const rootStore = new RootStore();
    const persistRootStore = persist(RootStore)(rootStore);

    const hydrate = create({
        storage: localStorage,
    });

    const result = hydrate(PERSIST_STORE, persistRootStore);
    const rehydrate = result.rehydrate;
    result.then(() => console.log('rootStore hydrated'));

    renderApp(persistRootStore);

    if ((module as NodeModuleWithReactHotReload).hot) {
        (module as NodeModuleWithReactHotReload).hot.accept(
            ['./App', './stores'],
            () => {
                rehydrate().then(() => console.log('rootStore rehydrated'));

                renderApp(persistRootStore);
            }
        );
    }
}

function renderApp(rootStore: RootStore) {
    ReactDOM.render(
        <Provider rootStore={rootStore}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
