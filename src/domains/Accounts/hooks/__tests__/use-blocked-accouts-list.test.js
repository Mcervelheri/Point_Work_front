import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';

import useGetBlockedAccountsList from '../use-blocked-accounts-list';

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

const URL_BLOCKED_ACCOUNTS_LIST = '/bff/private/v1/back-office/users/blocks';

const MOCK_SUCESS_RESPONSE = {
    totalOfItems: 12,
    limit: '10',
    page: '1',
    totalOfPages: 2,
    users: [
        {
            id: 418,
            operator: null,
            customerId: 10974,
            unblockedDate: null,
            customerAccount: 35745,
            username: '16388184286',
            customerName: 'Shaka de Virgem',
            nationalRegistration: '16388184286',
            createdAt: '2023-01-13 11:35:37',
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
    account: '12345',
    endDate: '2022-12-28',
    startDate: '2022-11-27',
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

const renderBlockedAccountsList = () => {
    return renderHook(() => useGetBlockedAccountsList(MOCK_QUERIES));
};

const hookWithSuccess = () => {
    mockApiSuccess();
    return renderBlockedAccountsList();
};

const hookWithEmptyResult = () => {
    mockApiEmpty();
    return renderBlockedAccountsList();
};

const hookWithError = () => {
    mockApiError();
    return renderBlockedAccountsList();
};

describe('Teste Unitário - useGetBlockedAccountsList', () => {
    describe('Quando ocorre sucesso na requisição', () => {
        let hook;

        beforeEach(async () => {
            hook = hookWithSuccess();
            hook.result.current.requestBlockedAccounts();
            await hook.waitForNextUpdate();
        });

        it('a requisição é chamada com a URL correta', () => {
            expect(getMock).toBeCalledWith(URL_BLOCKED_ACCOUNTS_LIST, {
                params: {
                    page: MOCK_QUERIES.page,
                    limit: MOCK_QUERIES.limit,
                    sort: MOCK_QUERIES.sort,
                    endDate: MOCK_QUERIES.endDate,
                    account: MOCK_QUERIES.account,
                    startDate: MOCK_QUERIES.startDate,
                    nationalRegistration: MOCK_QUERIES.nationalRegistration,
                },
            });
        });

        it('retorna a lista com as situações das contas', () => {
            expect(hook.result.current.blockedAccountsList).toEqual(MOCK_SUCESS_RESPONSE.users);
        });
    });

    describe('Quando a requisição é chamada com sucesso e não encontra resultados', () => {
        let hook;

        beforeEach(async () => {
            hook = hookWithEmptyResult();
            hook.result.current.requestBlockedAccounts();
            await hook.waitForNextUpdate();
        });

        it('o valor da propriedade requestBlockedAccounts é um array vazio', async () => {
            expect(hook.result.current.blockedAccountsList).toEqual(MOCK_EMPTY_RESPONSE.users);
        });
    });

    describe('Quando ocorre um erro na requisição', () => {
        let hook;

        beforeEach(() => {
            hook = hookWithError();
            hook.result.current.requestBlockedAccounts();
        });

        it('a função extractRequestError é chamada', () => {
            expect(extractRequestError).toHaveBeenCalled();
        });

        it('o valor da propriedade requestBlockedAccounts é um array vazio', () => {
            expect(hook.result.current.blockedAccountsList).toEqual([]);
        });
    });
});
