import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';

import useAccountDetails from '../useAccountDetails';

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
        success: 'work!',
    },
};

const mockGetAxiosSuccess = jest.fn().mockReturnValue(responseMockApi);
const mockGetAxiosFail = jest.fn().mockRejectedValue();

const accountId = 1523;

let hook;

const renderHookAndCallRequest = async getMock => {
    jest.clearAllMocks();

    axios.get = getMock;

    hook = renderHook(() => useAccountDetails(accountId));
    const { getAccountById } = hook.result.current;
    const response = await getAccountById();
    return response;
};

describe('Teste unitário - useAccountDetails', () => {
    describe('quando o hook é chamado com sucesso', () => {
        let response;
        beforeEach(async () => {
            response = await renderHookAndCallRequest(mockGetAxiosSuccess);
        });

        it('faz a chamada da url correta', () => {
            expect(mockGetAxiosSuccess).toHaveBeenCalledTimes(1);
            expect(mockGetAxiosSuccess).toHaveBeenCalledWith(`/bff/private/v1/back-office/account/${accountId}`);
        });

        it('retorna os dados trazidos pela requisição no estado do hook', () => {
            expect(hook.result.current.account).toEqual(responseMockApi.data);
        });

        it('retorna os dados trazidos pela requisição no retorno do hook', () => {
            expect(response).toEqual(responseMockApi.data);
        });
    });

    describe('quando o hook é chamado com erro', () => {
        it('aciona o error helper que retorna o feedback para o usuário', async () => {
            await renderHookAndCallRequest(mockGetAxiosFail);

            expect(extractRequestError).toHaveBeenCalledTimes(1);
        });
    });
});
