import React from 'react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import HomePage from '.';

const mockStore = configureMockStore();
const store = mockStore({});
const history = createMemoryHistory({
    initialEntries: [''],
});

test('O Componente <HomePage /> deve ser renderizado na tela corretamente', () => {
    const Element = renderer.create(
        <Router history={history}>
            <Provider store={store}>
                <HomePage />
            </Provider>,
        </Router>,

    ).toJSON();
    expect(Element).toMatchSnapshot();
});
