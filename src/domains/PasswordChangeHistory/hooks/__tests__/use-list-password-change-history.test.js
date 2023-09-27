import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';

import useListPasswordChangeHistory from '../use-list-password-change-history';

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

const URL_LIST_PASSWORD_CHANGE_HISTORY = '/bff/private/v1/back-office/users/password-update-history';

const MOCK_DATA = {
    page: 1,
    totalItemsPerPage: 10,
    count: 2,
    items: [
        {
            id: '1',
            operation: 'UPDATE_PASSWORD',
            createdAt: '2022-12-01T22:41:49.545Z',
            operationResult: true,
            clientIdentification: '12312312345',
            deviceId: '2',
        },
        {
            id: '2',
            operation: 'UPDATE_PASSWORD',
            createdAt: '2022-12-01T22:41:49.545Z',
            operationResult: true,
            clientIdentification: '12174835940',
            deviceId: '3',
        },
    ],
};

const MOCK_FIRST_REQUEST_PARMS = {
    operation: undefined,
    initialDate: undefined,
    endDate: undefined,
    operationResult: undefined,
    clientIdentification: undefined,
    totalItemsPerPage: 10,
    order: undefined,
    orderBy: undefined,
    page: 1,
};

const MOCK_REQUEST_PARAMS = {
    operation: 'UPDATE_PASSWORD',
    initialDate: '2022-12-06',
    endDate: '2022-12-06',
    operationResult: true,
    clientIdentification: '12312312345',
    totalItemsPerPage: 10,
    order: 'name',
    orderBy: 'desc',
    page: 1,
};

const mockApiSuccess = () => {
    axios.get = getMock.mockResolvedValue({
        data: MOCK_DATA,
    });
};

const mockApiError = () => {
    axios.get = getMock.mockRejectedValue({
        data: null,
    });
};

const renderListPasswordChangeHistory = () => {
    return renderHook(() => useListPasswordChangeHistory());
};

const renderHookWithSuccess = () => {
    mockApiSuccess();
    return renderListPasswordChangeHistory();
};

const renderHookWithError = () => {
    mockApiError();
    return renderListPasswordChangeHistory();
};

describe('useListPasswordChangeHistor | Teste Unitário', () => {
    describe('quando ocorre sucesso', () => {
        describe('e é a primeira chamada da requisição', () => {
            let hook;

            beforeEach(async () => {
                hook = renderHookWithSuccess();

                hook.result.current.requestDataPasswordChangeHistory(MOCK_FIRST_REQUEST_PARMS);

                await hook.waitForNextUpdate();
            });

            it('a requisição é chamada com a URL correta e com o params correto', () => {
                expect(getMock).toBeCalledWith(URL_LIST_PASSWORD_CHANGE_HISTORY, {
                    params: {
                        clientIdentification: null,
                        endDate: null,
                        initialDate: null,
                        operation: null,
                        operationResult: null,
                        order: null,
                        orderBy: null,
                        page: 1,
                        totalItemsPerPage: 10,
                    },
                });
            });
        });

        describe('e é uma requisição com filtros', () => {
            let hook;

            beforeEach(async () => {
                hook = renderHookWithSuccess();

                hook.result.current.requestDataPasswordChangeHistory(MOCK_REQUEST_PARAMS);

                await hook.waitForNextUpdate();
            });

            it('a requisição é chamada com a URL correta e com os valores corretos', () => {
                expect(getMock).toBeCalledWith(URL_LIST_PASSWORD_CHANGE_HISTORY, {
                    params: {
                        clientIdentification: '12312312345',
                        endDate: '2022-12-06',
                        initialDate: '2022-12-06',
                        operation: 'UPDATE_PASSWORD',
                        operationResult: true,
                        order: 'name',
                        orderBy: 'desc',
                        page: 1,
                        totalItemsPerPage: 10,
                    },
                });
            });

            it('o valor da propriedade passwordChangeHistory é retornado corretamente', () => {
                expect(hook.result.current.passwordChangeHistory).toBe(MOCK_DATA.items);
            });
        });
    });

    describe('quando ocorre um erro na requisição que listará o histórico de alteração de senha', () => {
        let hook;

        beforeEach(async () => {
            hook = renderHookWithError();

            hook.result.current.requestDataPasswordChangeHistory(MOCK_REQUEST_PARAMS);

            await hook.waitForNextUpdate();
        });

        it('exibe o feedback de erro para a requisição', () => {
            expect(extractRequestError).toHaveBeenCalled();
        });

        it('o valor da propriedade passwordChangeHistory é um array vazio', () => {
            expect(hook.result.current.passwordChangeHistory).toEqual([]);
        });
    });
});
