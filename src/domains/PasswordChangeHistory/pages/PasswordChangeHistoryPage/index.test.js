import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useUrlState from '../hooks/use-url-state';

import PasswordChangeHistoryPage from '.';
import useListPasswordChangeHistory from '../../hooks/use-list-password-change-history';

const MOCK_LIST = [
    {
        id: '1',
        operation: 'UPDATE_PASSWORD',
        createdAt: '2022-12-07T17:24:34.640Z',
        operationResult: true,
        clientIdentification: '12312312345',
        deviceId: '2',
    },
    {
        id: '2',
        operation: 'RESET_PASSWORD',
        createdAt: '2022-12-02T22:41:49.545Z',
        operationResult: false,
        clientIdentification: '12174835940',
        deviceId: '3',
    },
];

const DEFAULT_PARAMS_REQUEST = {
    clientIdentification: null,
    endDate: null,
    initialDate: null,
    operation: null,
    operationResult: null,
    order: null,
    orderBy: null,
    page: 1,
    totalItemsPerPage: 10,
};

let getSetUrlStateSetValues;

const mockSetUrlState = jest.fn().mockImplementation(params => {
    getSetUrlStateSetValues = params;
});

const requestDataPasswordChangeHistoryMock = jest.fn();

jest.mock('../../../../components/Breadcrumb', () => {
    return () => <div>Breadcrumb</div>;
});

jest.mock('../../components/PasswordChangeHistoryFilter', () => {
    return () => <div>PasswordChangeHistoryFilter</div>;
});

jest.mock('../../hooks/use-list-password-change-history');

jest.mock('../../components/TagResultOperation', () => {
    return () => <div>TagResultOperation</div>;
});

jest.mock('../../components/TagTypeOperation', () => {
    return () => <div>TagTypeOperation</div>;
});

jest.mock('../../../../hooks/use-url-state');

describe('PasswordChangeHistoryPage - Testes Unitários', () => {
    beforeEach(() => {
        useUrlState.mockReturnValue([
            {
                clientIdentification: null,
                operation: null,
                initialDate: null,
                endDate: null,
                operationResult: null,
                totalItemsPerPage: 10,
                page: 1,
                order: null,
                orderBy: null,
            },
            mockSetUrlState,
        ]);

        useListPasswordChangeHistory.mockReturnValue({
            loading: false,
            totalItems: 10,
            requestDataPasswordChangeHistory: requestDataPasswordChangeHistoryMock,
            passwordChangeHistory: MOCK_LIST,
        });

        render(
            <PasswordChangeHistoryPage />,
        );
    });

    it('salva na setUrlState o objeto correto para a primeira chamada', () => {
        expect(getSetUrlStateSetValues()).toEqual(DEFAULT_PARAMS_REQUEST);
    });

    it('chama o request que irá trazer o histórico de alteração de senha', () => {
        expect(requestDataPasswordChangeHistoryMock).toHaveBeenCalledWith(DEFAULT_PARAMS_REQUEST);
    });

    it.each`
        field
        ${'CPF'}
        ${'Resultado da operação'}
    `('chama o request novamente após ordenar por $field', ({ field }) => {
        userEvent.click(screen.getByText(field));

        expect(requestDataPasswordChangeHistoryMock).toHaveBeenCalled();
    });

    it('exibe os dados da alteração de senha na tabela', () => {
        const nationalRegistration = screen.getByText('123.123.123-45');
        const operation = screen.getAllByText('TagTypeOperation');
        const operationResult = screen.getAllByText('TagResultOperation');
        const date = screen.getByText('07/12/2022', {
            exact: false,
        });

        expect(nationalRegistration).toBeInTheDocument();
        expect(operation[0]).toBeInTheDocument();
        expect(operationResult[0]).toBeInTheDocument();
        expect(date).toBeInTheDocument();
    });
});
