import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ButtonEditClientVip from '.';
import EditClientVipDialog from '../EditClientVipDialog';

jest.mock('../EditClientVipDialog');

const renderButtonEditClientVip = disabled => {
    render(
        <ButtonEditClientVip
            id="123"
            name="Naruto"
            nationalRegistration="34343053946"
            onRefresh={jest.fn()}
            disabled={disabled}
        />,
    );
};

describe('ButtonEditClientVip - Teste Unitário', () => {
    describe('quando o botão está desabilitado', () => {
        beforeEach(() => {
            renderButtonEditClientVip(true);
        });

        it('não abre o modal para realizar as alterações', () => {
            const buttonEdit = screen.getByText('Editar');

            userEvent.click(buttonEdit);

            expect(EditClientVipDialog.show).not.toBeCalled();
        });
    });

    describe('quando o botão está habilitado', () => {
        beforeEach(() => {
            renderButtonEditClientVip(false);
        });

        it('exibe corratemente o texto do botão', () => {
            const buttonEdit = screen.getByText('Editar');

            expect(buttonEdit).toBeInTheDocument();
        });

        it('abre o modal para realizar as alterações', () => {
            const buttonEdit = screen.getByText('Editar');

            userEvent.click(buttonEdit);

            expect(EditClientVipDialog.show).toBeCalled();
        });
    });
});
