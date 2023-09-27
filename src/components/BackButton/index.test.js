import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useHistory } from 'react-router-dom';

import BackButton from './index';

jest.mock('react-router-dom', () => ({
    useHistory: jest.fn().mockReturnValue({
        goBack: jest.fn(),
    }),
}));

describe('Teste unitário | BackButton', () => {
    let button;

    beforeEach(() => {
        render(<BackButton />);
        button = screen.getByRole('button');
    });

    it('renderiza o botão corretamente', () => {
        expect(button).toBeInTheDocument();
    });

    it('chama a função goBack quando clicado', () => {
        userEvent.click(button);
        expect(useHistory().goBack).toHaveBeenCalledTimes(1);
    });
});
