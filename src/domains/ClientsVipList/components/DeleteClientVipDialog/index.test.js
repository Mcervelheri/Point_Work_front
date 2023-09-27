import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DeleteClientVipDialog from '.';
import useDeleteClientVip from '../../hooks/use-delete-client-vip';

jest.mock('../../hooks/use-delete-client-vip');

const onCancelMock = jest.fn();
const onRefreshMock = jest.fn();
const requestDeleteClientVipMock = jest.fn();

const MOCK_ID_MULTIPLE = [1, 2];
const MOCK_ID_UNIQUE = [1];

const renderDeleteClientVipDialog = ids => {
    useDeleteClientVip.mockImplementation(onSuccessMock => {
        return {
            loading: false,
            requestDeleteClientVip: requestDeleteClientVipMock.mockImplementation(onSuccessMock),
        };
    });

    render(
        <DeleteClientVipDialog
            visible
            onCancel={onCancelMock}
            ids={ids}
            onRefresh={onRefreshMock}
        />,
    );
};

describe('DeleteClientVipDialog | Teste Unitário', () => {
    describe('quando há vários clientes para serem excluidos', () => {
        beforeEach(() => {
            renderDeleteClientVipDialog(MOCK_ID_MULTIPLE);
        });

        it('exibe as mensagem de alerta para o usuário', () => {
            expect(screen.getByText('Tem certeza que deseja excluir', {
                exact: false,

            })).toBeInTheDocument();

            expect(screen.getByText('2')).toBeInTheDocument();

            expect(screen.getByText('clientes convidados?', {
                exact: false,
            })).toBeInTheDocument();

            expect(screen.getByText('Essa ação não poderá ser desfeita.')).toBeInTheDocument();
        });

        it('chama o onCancelMock quando pressionado o botão cancelar', () => {
            const buttonCancel = screen.getByText('Cancelar');

            userEvent.click(buttonCancel);

            expect(onCancelMock).toHaveBeenCalled();
        });

        describe('quando há exclusão de um cliente com sucesso', () => {
            beforeEach(() => {
                const buttonConfirm = screen.getByText('Sim, excluir');

                userEvent.click(buttonConfirm);
            });

            it('chama a função de requisiçao', () => {
                expect(requestDeleteClientVipMock).toHaveBeenCalled();
            });

            it('chama o onCancel para fechar a modal', () => {
                expect(onCancelMock).toHaveBeenCalled();
            });

            it('chama o onRefresh para atualizar a lista', () => {
                expect(onRefreshMock).toHaveBeenCalled();
            });
        });
    });

    describe('quando há somente um cliente para ser excluido', () => {
        beforeEach(() => {
            renderDeleteClientVipDialog(MOCK_ID_UNIQUE);
        });

        it('exibe as mensagem de alerta para o usuário', () => {
            expect(screen.getByText('Tem certeza que deseja excluir o cliente convidado?')).toBeInTheDocument();
            expect(screen.getByText('Essa ação não poderá ser desfeita.')).toBeInTheDocument();
        });
    });
});
