import React from 'react';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Breadcrumb from './index';

const history = createMemoryHistory({
    initialEntries: [''],
});

const MOCK_PATHS = [
    {
        path: '/app',
        name: 'Home',
    },
    {
        path: '/app/contas',
        name: 'Contas',
    },
    {
        name: 'Editar Sócios',
    },
    {
        path: '/app',
        name: 'Home',
    },
];

test('O Componente <Breadcrumb /> deve ser renderizado na tela corretamente', () => {
    const Element = renderer.create(
        <Router history={history}>
            <Breadcrumb
                routes={MOCK_PATHS}
            />
        </Router>,

    ).toJSON();
    expect(Element).toMatchSnapshot();
});
