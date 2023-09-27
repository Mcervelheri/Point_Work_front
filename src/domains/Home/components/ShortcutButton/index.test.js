import React from 'react';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Icon, { AntDesign } from '../components/Icon';

import ShortcutButton from './index';

const history = createMemoryHistory({
    initialEntries: [''],
});

test('O Componente <ShortcutButton /> deve ser renderizado na tela corretamente', () => {
    const Element = renderer.create(
        <Router history={history}>
            <ShortcutButton
                path="/path/test"
                icon={(
                    <Icon
                        family={AntDesign}
                        name="FillBank"
                        size={20}
                    />
                )}
                title="titulo test"
            />
        </Router>,

    ).toJSON();
    expect(Element).toMatchSnapshot();
});
