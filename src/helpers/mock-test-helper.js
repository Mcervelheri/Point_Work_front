import React from 'react';

import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import { Router, MemoryRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

const defaultConfig = {
    useSelectorValues: {},
    mockDispatch: false,
    mockLocation: false,
    locationState: {},
    pathName: '/',
    search: '',
};

const defineUsedMocks = (config, children) => {

    let component = children;
    const mockLocationInitialEntries = [];

    if (config.useSelectorValues) {
        const spySelector = jest.spyOn(redux, 'useSelector');
        spySelector.mockReturnValue(config.useSelectorValues);
    }

    if (config.mockDispatch) {
        const spyDispatch = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn();
        spyDispatch.mockReturnValue(mockDispatchFn);
    }

    if (config.mockLocation) {

        const mockLocationObject = {
            pathname: config.pathName,
            search: config.search,
            hash: '',
            state: config.locationState,
            key: '5nvxpbdafa',
        };

        mockLocationInitialEntries.push(mockLocationObject);

        component = (
            <MemoryRouter initialEntries={mockLocationInitialEntries}>
                {children}
            </MemoryRouter>
        );
    }

    const history = createMemoryHistory({
        initialEntries: [''],
    });
    if (config.locationState) {
        const state = { ...config.locationState };
        history.push(config.pathName, state);
    }
    return { history, component };
};
export const renderWithMocks = (children, config = defaultConfig) => {
    const { history, component } = defineUsedMocks(config, children);
    const mockStore = configureMockStore();
    const store = mockStore({
        ...config.useSelectorValues,
    });

    return (
        render(
            <Router history={history}>
                <Provider store={store}>
                    {component}
                </Provider>
            </Router>,
        )
    );
};
export const createWithMocks = (children, config = defaultConfig) => {
    const { history, component } = defineUsedMocks(config, children);
    const mockStore = configureMockStore();
    const store = mockStore({
        ...config.useSelectorValues,
    });

    return (
        create(
            <Router history={history}>
                <Provider store={store}>
                    {component}
                </Provider>
            </Router>,
        )
    );
};
