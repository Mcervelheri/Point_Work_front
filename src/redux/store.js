import {
    createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

import { reducers, actions } from './ducks';

const mainReducer = (state, action) => {
    if (action.type === actions.usuario.logout().type) {
        return reducers({}, action);
    }
    return reducers(state, action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(
    mainReducer,
    composeEnhancers(
        applyMiddleware(thunk),
    ),
);

if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept('./ducks', () => {
            store.replaceReducer(mainReducer);
        });
    }
}

export default store;
