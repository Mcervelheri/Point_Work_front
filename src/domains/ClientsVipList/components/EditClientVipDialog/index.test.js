import React from 'react';

import {
    render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditClientVipDialog from '.';
import useEditClientVip from '../../hooks/use-edit-client-vip';

jest.mock('../../hooks/use-edit-client-vip');

const onCancelMock = jest.fn();
const onRefreshMock = jest.fn();
const requestEditClientVipMock = jest.fn().mockReturnValue(true);

const renderEditClientVipDialog = () => {
    useEditClientVip.mockImplementation(onSuccessMock => {
        return {
            loading: false,
            requestEditClientVip: requestEditClientVipMock.mockImplementation(onSuccessMock),
        };
    });

    render(
        <EditClientVipDialog
            visible
            currentName="Naruto"
            currentNationalRegistration="34343053946"
            onCancel={onCancelMock}
            onRefresh={onRefreshMock}
            id="1"
        />,
    );
};

describe('EditClientVipDialog | Teste Unitário', () => {
    beforeEach(() => {
        renderEditClientVipDialog();
    });

    it('chama o onCancelMock quando pressionado o botão cancelar', () => {
        const buttonCancel = screen.getByText('Cancelar');

        userEvent.click(buttonCancel);

        expect(onCancelMock).toHaveBeenCalled();
    });

    describe('quando há edição dos dados de um cliente com sucesso', () => {
        beforeEach(async () => {
            const buttonConfirm = screen.getByText('Salvar');
            const nameInput = screen.getByPlaceholderText('Nome do cliente');

            userEvent.click(nameInput);
            userEvent.paste(nameInput, 'naruto uzumaki');

            await waitFor(() => {
                userEvent.click(buttonConfirm);
            });
        });

        it('chama a requisiçao correta', () => {
            expect(requestEditClientVipMock).toHaveBeenCalled();
        });

        it('chama o onCancel para fechar a modal', () => {
            expect(onCancelMock).toHaveBeenCalled();
        });

        it('chama o onRefresh para atualizar a lista', () => {
            expect(onRefreshMock).toHaveBeenCalled();
        });
    });
});
