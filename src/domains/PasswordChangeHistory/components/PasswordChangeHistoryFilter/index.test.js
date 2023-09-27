import React from 'react';

import { render, screen } from '@testing-library/react';

import PasswordChangeHistoryFilter from '.';

const onSearchMock = jest.fn();

const MOCK_FILTERS = {
    page: '1',
    limit: '10',
    operation: undefined,
    endDate: '2022-12-28',
    operationResult: undefined,
    initialDate: '2022-12-21',
    clientIdentification: '31248863054',
};

describe('PasswordChangeHistoryFilter | Testes Unitários', () => {
    beforeEach(() => {
        render(<PasswordChangeHistoryFilter
            onSearch={onSearchMock}
            initialFilters={MOCK_FILTERS}
        />);
    });

    it('renderiza o input de CPF', () => {
        expect(screen.getByPlaceholderText('CPF')).toBeInTheDocument();
    });

    it('renderiza o input de data', () => {
        expect(screen.getByPlaceholderText('Start date')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('End date')).toBeInTheDocument();
    });

    it.each`
        input                                     | placeholder
        ${'de seleção do tipo de operação'}       | ${'Tipo da operação'}
        ${'de seleção do resultado da operação'}  | ${'Resultados'}
    `('exibe o input $input', ({ placeholder }) => {
        expect(screen.getByText(placeholder)).toBeInTheDocument();
    });
});
