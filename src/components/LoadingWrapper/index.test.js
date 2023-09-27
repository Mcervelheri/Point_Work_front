import React from 'react';

import renderer from 'react-test-renderer';

import LoadingWrapper from './index';

test('O componente <LoadingWrapper /> deve renderiza o Spinner quando a propriedade loading for true', () => {
    const Wrapper = renderer.create(
        <LoadingWrapper
            loading
        >
            <div>
                Renderiza o spinnerContainer
            </div>
        </LoadingWrapper>,
    );

    expect(Wrapper.toJSON()).toMatchSnapshot();
});

test('O componente <LoadingWrapper /> NÃO deve renderiza o Spinner quando a propriedade loading for false', () => {
    const Wrapper = renderer.create(
        <LoadingWrapper>
            <div>
                Não renderiza o spinnerContainer
            </div>
        </LoadingWrapper>,
    );

    expect(Wrapper.toJSON()).toMatchSnapshot();
});
