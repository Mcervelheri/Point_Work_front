import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FilterClientsVip from '.';

const onSearchMock = jest.fn();

describe('FilterClientsVip | Testes Unitários', () => {
    beforeEach(() => {
        render(<FilterClientsVip onSearch={onSearchMock} />);
    });

    it('exibe os input de CPF e de nome', () => {
        const nationalRegistrationInput = screen.getByPlaceholderText('Pesquisar CPF');
        const nameInput = screen.getByPlaceholderText('Pesquisar nome');

        expect(nationalRegistrationInput).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
    });

    it('chama o onSearchMock com CPF digitado para filtrar', async () => {
        const buttonFilter = screen.getByText('Filtrar');
        const nationalRegistrationInput = screen.getByPlaceholderText('Pesquisar CPF');

        userEvent.click(nationalRegistrationInput);
        userEvent.paste(nationalRegistrationInput, '12174835940');

        await waitFor(() => {
            userEvent.click(buttonFilter);
        });

        expect(onSearchMock).toBeCalledWith({ nationalRegistration: '12174835940' });
    });
});
