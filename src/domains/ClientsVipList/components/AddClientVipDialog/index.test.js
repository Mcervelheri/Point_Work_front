import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddClientVipDialog from '.';
import useAddClientVip from '../../hooks/use-add-client-vip';

jest.mock('../../hooks/use-add-client-vip');

const onCancelMock = jest.fn();
const onRefreshMock = jest.fn();
const requestAddClientVipMock = jest.fn();

describe('AddClientVipDialog | Teste Unitário', () => {
    beforeEach(() => {
        useAddClientVip.mockImplementation(onSuccessMock => {
            return {
                loading: false,
                requestAddClientVip: requestAddClientVipMock.mockImplementation(onSuccessMock),
            };
        });

        render(
            <AddClientVipDialog
                visible
                onCancel={onCancelMock}
                onRefresh={onRefreshMock}
            />,
        );
    });

    it('chama o onCancelMock quando pressionado o botão cancelar', () => {
        const buttonCancel = screen.getByText('Cancelar');

        userEvent.click(buttonCancel);

        expect(onCancelMock).toHaveBeenCalled();
    });

    describe('quando há adição de um novo cliente com sucesso', () => {
        beforeEach(async () => {
            const nationalRegistrationInput = screen.getByPlaceholderText('CPF do cliente');
            const nameInput = screen.getByPlaceholderText('Nome do cliente');
            const buttonAdd = screen.getByText('Adicionar');

            userEvent.type(nationalRegistrationInput, '12174835940');

            userEvent.type(nameInput, 'Naruto');

            await waitFor(() => {
                userEvent.click(buttonAdd);
            });
        });

        it('chama a função de requisiçao', async () => {
            await waitFor(() => {
                expect(requestAddClientVipMock).toHaveBeenCalled();
            });
        });

        it('chama o onCancel para fechar a modal', () => {
            expect(onCancelMock).toHaveBeenCalled();
        });

        it('chama o onRefresh para atualizar a lista', () => {
            expect(onRefreshMock).toHaveBeenCalled();
        });
    });
});
