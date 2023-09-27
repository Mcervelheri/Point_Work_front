import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ButtonDeleteSingleClient from '.';
import DeleteClientVipDialog from '../DeleteClientVipDialog';

jest.mock('../DeleteClientVipDialog');

const renderButtonSingleClient = disabled => {
    render(
        <ButtonDeleteSingleClient idClient="123" disabled={disabled} />,
    );
};

describe('ButtonDeleteSingleClient - Teste Unitário', () => {
    describe('quando o botão está desabilitado', () => {
        beforeEach(() => {
            renderButtonSingleClient(true);
        });

        it('não abre o modal para confirmar a remoção', () => {
            const buttonDelete = screen.getByText('Excluir');

            userEvent.click(buttonDelete);

            expect(DeleteClientVipDialog.show).not.toBeCalled();
        });
    });

    describe('quando o botão está habilitado', () => {
        beforeEach(() => {
            renderButtonSingleClient(false);
        });

        it('exibe corratemente o texto do botão', () => {
            const buttonDelete = screen.getByText('Excluir');

            expect(buttonDelete).toBeInTheDocument();
        });

        it('abre o modal para confirmar a remoção', () => {
            const buttonDelete = screen.getByText('Excluir');

            userEvent.click(buttonDelete);

            expect(DeleteClientVipDialog.show).toBeCalled();
        });
    });
});
