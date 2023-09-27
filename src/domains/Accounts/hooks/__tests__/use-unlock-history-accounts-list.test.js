import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';

import useGetUnlockHistoryAccountsList from '../use-unlock-history-accounts-list';

jest.mock('../../../../helpers/error-helper', () => ({
    extractRequestError: jest.fn(),
}));

jest.mock('../../../../hooks/use-async', () => {
    return jest.fn(cb => ({
        loading: false,
        call: cb,
    }));
});

const getMock = jest.fn();

const URL_HISTORY_UNLOCKED_ACCOUNTS_LIST = '/bff/private/v1/back-office/users/unblock/report';

const MOCK_SUCESS_RESPONSE = {
    limit: 10,
    page: 1,
    totalOfItems: 234,
    totalOfPages: 24,
    users: [
        {
            id: 417,
            customerId: 8917,
            customerAccount: 10300,
            username: '90183329090',
            operator: 'Afrodite de Peixes',
            customerName: 'Hyoga de Cisne',
            createdAt: '2022-12-27 18:13:21',
            nationalRegistration: '90183329090',
            unblockedDate: '2022-12-27 15:13:25',
        },
    ],
};

const MOCK_EMPTY_RESPONSE = {
    page: 1,
    data: [],
    totalOfItems: 0,
    totalOfPages: 0,
};

const MOCK_QUERIES = {
    page: '2',
    limit: '10',
    sort: 'ASC',
    orderBy: 'name',
    account: '12345',
    endDate: '2022-12-28',
    startDate: '2022-11-27',
    operator: 'Afrodite de Peixes',
    nationalRegistration: '90183329090',
};

const mockApiSuccess = () => {
    axios.get = getMock.mockResolvedValue({
        data: MOCK_SUCESS_RESPONSE,
    });
};

const mockApiEmpty = () => {
    axios.get = getMock.mockResolvedValue({
        data: MOCK_EMPTY_RESPONSE,
    });
};

const mockApiError = () => {
    axios.get = getMock.mockRejectedValue({
        data: null,
    });
};

const renderHistoryUnloackAccountsList = () => {
    return renderHook(() => useGetUnlockHistoryAccountsList(MOCK_QUERIES));
};

const hookWithSuccess = () => {
    mockApiSuccess();
    return renderHistoryUnloackAccountsList();
};

const hookWithEmptyResult = () => {
    mockApiEmpty();
    return renderHistoryUnloackAccountsList();
};

const hookWithError = () => {
    mockApiError();
    return renderHistoryUnloackAccountsList();
};

describe('Teste Unitário - useGetHistoryUnloakAccountsList', () => {
    describe('Quando ocorre sucesso na requisição', () => {
        let hook;

        beforeEach(async () => {
            hook = hookWithSuccess();
            hook.result.current.requestUnloackHistoryAccounts();
            await hook.waitForNextUpdate();
        });

        it('a requisição é chamada com a URL correta', () => {
            expect(getMock).toBeCalledWith(URL_HISTORY_UNLOCKED_ACCOUNTS_LIST, {
                params: {
                    page: MOCK_QUERIES.page,
                    limit: MOCK_QUERIES.limit,
                    order: MOCK_QUERIES.sort,
                    endDate: MOCK_QUERIES.endDate,
                    account: MOCK_QUERIES.account,
                    orderBy: MOCK_QUERIES?.orderBy,
                    operator: MOCK_QUERIES?.operator,
                    startDate: MOCK_QUERIES.startDate,
                    nationalRegistration: MOCK_QUERIES.nationalRegistration,
                },
            });
        });

        it('retorna a lista com as situações das contas', () => {
            expect(hook.result.current.unblockList).toEqual(MOCK_SUCESS_RESPONSE.users);
        });
    });

    describe('Quando a requisição é chamada com sucesso e não encontra resultados', () => {
        let hook;

        beforeEach(async () => {
            hook = hookWithEmptyResult();
            hook.result.current.requestUnloackHistoryAccounts();
            await hook.waitForNextUpdate();
        });

        it('o valor da propriedade requestUnloackHistoryAccounts é um array vazio', async () => {
            expect(hook.result.current.unblockList).toEqual(MOCK_EMPTY_RESPONSE.users);
        });
    });

    describe('Quando ocorre um erro na requisição', () => {
        let hook;

        beforeEach(async () => {
            hook = hookWithError();
            hook.result.current.requestUnloackHistoryAccounts();
        });

        it('a função extractRequestError é chamada', async () => {
            await waitFor(() => {
                expect(extractRequestError).toHaveBeenCalled();
            });
        });

        it('o valor da propriedade requestUnloackHistoryAccounts é um array vazio', async () => {
            await waitFor(() => {
                expect(hook.result.current.unblockList).toEqual([]);
            });
        });
    });
});
