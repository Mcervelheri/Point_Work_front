import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '../Input';
import Filter from './index';

const onSearchrMock = jest.fn(value => value.teste);

const renderFilter = (allowClearFilters = true) => {
    return render(
        <Filter
            onSearch={onSearchrMock}
            allowClearFilters={allowClearFilters}
        >
            <Input.Field
                name="teste"
                placeholder="placeholder"
            />
        </Filter>,
    );
};

describe('Filter | Testes Unitários', () => {
    describe('quando o componente possui título e botão para limpar os filtros', () => {
        beforeEach(() => {
            renderFilter();
        });

        it('retorna o valor informado no input quando pressionado Filtrar', async () => {
            const inputField = screen.getByRole('textbox');

            userEvent.type(inputField, 'TESTE');

            const button = screen.getByText('Filtrar');

            userEvent.click(button);

            await waitFor(() => {
                expect(onSearchrMock).toHaveReturnedWith('TESTE');
            });
        });

        it('exibe o botão para limpar os filtros', () => {
            expect(screen.getByTestId('clean-button')).toBeInTheDocument();
        });
    });

    describe('quando o componente não possui título e botão para limpar os filtros', () => {
        beforeEach(() => {
            renderFilter(false);
        });

        it('não exibe o botão para limpar os filtros', () => {
            expect(screen.queryByTestId('clean-button')).not.toBeInTheDocument();
        });
    });
});
