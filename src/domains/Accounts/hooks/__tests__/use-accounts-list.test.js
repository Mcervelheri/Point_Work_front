import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';

import useGetAccountsList from '../use-accounts-list';

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

const URL_ACCOUNTS_LIST = '/bff/private/v1/back-office/accounts?onlyMain=false';

const MOCK_SUCESS_RESPONSE = {
    totalItems: 358,
    totalItemsPerPage: 10,
    page: 2,
    totalPages: 36,
    data: [
        {
            accountId: 17,
            externalId: null,
            status: 'ACTIVE',
            openAt: '2021-04-13T00:12:10.000Z',
            clients: [
                {
                    type: 'P',
                    spd: null,
                    company: {},
                    clientId: 17,
                    externalId: null,
                    accountProfile: 'OWNER',
                    clientBlockedStatus: 'UNBLOCKED',
                    nationalRegistration: '22921570041',
                    idRegistration: '6e388ace-e823-4b23-8571-74381f650f90',
                },
            ],
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
    spd: '4',
    page: '2',
    limit: '10',
    order: 'ASC',
    account: '12345',
    status: 'ACTIVE',
    orderBy: 'account',
    finalDate: '2022-12-28',
    totalItemsPerPage: '10',
    initialDate: '2022-11-27',
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

const renderAccountsList = () => {
    return renderHook(() => useGetAccountsList(MOCK_QUERIES));
};

const hookWithSuccess = () => {
    mockApiSuccess();
    return renderAccountsList();
};

const hookWithEmptyResult = () => {
    mockApiEmpty();
    return renderAccountsList();
};

const hookWithError = () => {
    mockApiError();
    return renderAccountsList();
};

describe('Teste Unitário - useGetAccountsList', () => {
    describe('Quando ocorre sucesso na requisição', () => {
        let hook;

        beforeEach(async () => {
            hook = hookWithSuccess();
            hook.result.current.requestAccountsData();
            await hook.waitForNextUpdate();
        });

        it('a requisição é chamada com a URL correta', () => {
            expect(getMock).toBeCalledWith(URL_ACCOUNTS_LIST, {
                params: {
                    spd: MOCK_QUERIES.spd,
                    page: MOCK_QUERIES.page,
                    limit: MOCK_QUERIES.limit,
                    order: MOCK_QUERIES.order,
                    status: MOCK_QUERIES.status,
                    orderBy: MOCK_QUERIES.orderBy,
                    finalDate: MOCK_QUERIES.finalDate,
                    accountData: MOCK_QUERIES.account,
                    initialDate: MOCK_QUERIES.initialDate,
                },
            });
        });

        it('retorna a lista com as situações das contas', () => {
            expect(hook.result.current.accountsList).toEqual(MOCK_SUCESS_RESPONSE.data);
        });
    });

    describe('Quando a requisição é chamada com sucesso e não encontra resultados', () => {
        let hook;

        beforeEach(async () => {
            hook = hookWithEmptyResult();
            hook.result.current.requestAccountsData();
            await hook.waitForNextUpdate();
        });

        it('o valor da propriedade requestAccountsData é um array vazio', () => {
            expect(hook.result.current.accountsList).toEqual(MOCK_EMPTY_RESPONSE.data);
        });
    });

    describe('Quando ocorre um erro na requisição', () => {
        let hook;

        beforeEach(() => {
            hook = hookWithError();
            hook.result.current.requestAccountsData();
        });

        it('a função extractRequestError é chamada', async () => {
            await waitFor(() => {
                expect(extractRequestError).toHaveBeenCalled();
            });
        });

        it('o valor da propriedade requestAccountsData é um array vazio', async () => {
            await waitFor(() => {
                expect(hook.result.current.accountsList).toEqual([]);
            });
        });
    });
});
