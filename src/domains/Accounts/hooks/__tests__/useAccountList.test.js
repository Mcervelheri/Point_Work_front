import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';

import useAccountList from '../useAccountList';

jest.mock('../../../../hooks/use-async', () => {
    return jest.fn(callback => ({
        loading: false,
        call: callback,
    }));
});

jest.mock('../../../../helpers/error-helper', () => ({
    extractRequestError: jest.fn(),
}));

const responseMockApi = {
    data: {
        success: 'get list!',
    },
};

const mockGetAxiosSuccess = jest.fn().mockReturnValue(responseMockApi);
const mockGetAxiosFail = jest.fn().mockRejectedValue();

const accountNumber = 9969;

let hook;

const renderHookAndCallRequest = async (getMock, number) => {
    jest.clearAllMocks();

    axios.get = getMock;

    hook = renderHook(() => useAccountList());
    const { getAccounts } = hook.result.current;
    const response = await getAccounts(number);
    return response;
};

describe('Teste unitário - useAccountList', () => {
    describe('quando o hook é chamado passando um accountNumber', () => {
        let response;
        beforeEach(async () => {
            response = await renderHookAndCallRequest(mockGetAxiosSuccess, accountNumber);
        });

        it('faz a chamada da url correta com um accountData', () => {
            expect(mockGetAxiosSuccess).toHaveBeenCalledTimes(1);
            expect(mockGetAxiosSuccess).toHaveBeenCalledWith('/bff/private/v1/back-office/accounts?onlyMain=false', {
                params: {
                    accountData: 9969,
                },
            });
        });

        it('retorna os dados trazidos pela requisição no retorno do hook', () => {
            expect(response).toEqual(responseMockApi.data);
        });

    });

    describe('quando o hook é chamado sem passar um accountNumber', () => {
        beforeEach(async () => {
            await renderHookAndCallRequest(mockGetAxiosSuccess);
        });

        it('faz a chamada da url correta com um accountData', () => {
            expect(mockGetAxiosSuccess).toHaveBeenCalledTimes(1);
            expect(mockGetAxiosSuccess).toHaveBeenCalledWith('/bff/private/v1/back-office/accounts?onlyMain=false', {
                params: {
                    accountData: null,
                },
            });
        });
    });

    describe('quando o hook é chamado com erro', () => {
        it('aciona o error helper que retorna o feedback para o usuário', async () => {
            await renderHookAndCallRequest(mockGetAxiosFail);

            expect(extractRequestError).toHaveBeenCalledTimes(1);
        });
    });
});
