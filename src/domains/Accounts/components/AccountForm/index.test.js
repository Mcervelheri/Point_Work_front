import React from 'react';

import { create } from 'react-test-renderer';

import Input from '../components/Input';

import AccountForm from './index';

const FORM_MOCK = {
    legalName: 'Empresa Fake',
};

const inputProps = {
    onChange: jest.fn,
    value: 'Razão Social',
};

test('renderiza componente <AccountForm /> no modo de visualização corretamente', () => {
    const tree = create(
        <AccountForm
            data={FORM_MOCK}
            onSave={jest.fn}
        >
            <Input
                name="legalName"
                label="Razão Social"
                input={inputProps}
            />
        </AccountForm>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test('renderiza componente <AccountForm /> no modo de inserção corretamente', () => {
    const tree = create(
        <AccountForm
            onSave={jest.fn}
        >
            <Input
                name="legalName"
                label="Razão Social"
                input={inputProps}
            />
        </AccountForm>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test('renderiza componente <AccountForm /> com opção para deleção corretamente', () => {
    const tree = create(
        <AccountForm
            onDelete={jest.fn}
        >
            <Input
                name="legalName"
                label="Razão Social"
                input={inputProps}
            />
        </AccountForm>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test('renderiza componente <AccountForm /> com conteúdo do children como função corretamente', () => {
    const tree = create(
        <AccountForm
            onDelete={jest.fn}
        >
            {() => (
                <Input
                    name="legalName"
                    label="Razão Social"
                    input={inputProps}
                />
            )}
        </AccountForm>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
