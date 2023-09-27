import React from 'react';

import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import InfoCompany from './index';

const mockStore = configureMockStore();
const store = mockStore({});

const MOCK_INFO_COMPANY = {
    id: 1,
    name: 'Fazenda Vaquinha Feliz Ltda.',
    cnpj: '00.000.000/0001-00',
};

test('O Componente <InfoCompany /> deve ser renderizado na tela corretamente', () => {
    const Element = renderer.create(
        <Provider store={store}>
            <InfoCompany
                name={MOCK_INFO_COMPANY.name}
                cpf={MOCK_INFO_COMPANY.cnpj}
            />
        </Provider>,
    ).toJSON();
    expect(Element).toMatchSnapshot();
});
