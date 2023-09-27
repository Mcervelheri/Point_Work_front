import React from 'react';

import {
    fireEvent, render, screen,
} from '@testing-library/react';

import RechargeInfoDialog from './index';

const DATA_MODAL = {
    Operadora: 'AL5 Telecom',
    NSU: 12345,
    NSUOperadora: 14785963,
    Tipo: 'Recarga',
};

const ID = '354c8f14-a9c8-4919-ae56-448c5388e882';

describe('Testa o componente RechargeInfoDialog \n', () => {

    test('deve conter o título da modal conforme o id', () => {

        render(
            <RechargeInfoDialog visible dataModal={DATA_MODAL} id={ID} />,
        );

        const title = screen.getByText('Dados Efetivada:', {
            exact: false,
        });

        expect(title).toBeTruthy();
    });

    test('deve conter o nome da operadora', () => {

        render(
            <RechargeInfoDialog visible dataModal={DATA_MODAL} id={ID} />,
        );

        const operatorName = screen.getByText(DATA_MODAL.NSUOperadora, {
            exact: false,
        });

        expect(operatorName).toBeTruthy();
    });

    test('deve conter o NSU da operadora', () => {

        render(
            <RechargeInfoDialog visible dataModal={DATA_MODAL} id={ID} />,
        );

        const operatorName = screen.getByText(DATA_MODAL.NSU, {
            exact: false,
        });

        expect(operatorName).toBeTruthy();
    });

    test('deve conter o tipo da operação', () => {

        render(
            <RechargeInfoDialog visible dataModal={DATA_MODAL} id={ID} />,
        );

        const operatorName = screen.getByText(DATA_MODAL.Tipo, {
            exact: false,
        });

        expect(operatorName).toBeTruthy();
    });

    test('deve fechar a modal ao clicar no botão OK', async () => {

        const onCancelMock = jest.fn();

        render(
            <RechargeInfoDialog
                visible
                id={ID}
                onCancel={onCancelMock}
                dataModal={DATA_MODAL}
            />,
        );

        const button = await screen.findByText('OK');

        fireEvent.click(button);

        expect(onCancelMock).toHaveBeenCalled();
    });

});
