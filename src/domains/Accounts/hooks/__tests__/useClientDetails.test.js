import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';

import useClientDetails from '../useClientDetails';

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
        success: 'work nice!',
    },
};

const mockGetAxiosSuccess = jest.fn().mockReturnValue(responseMockApi);
const mockGetAxiosFail = jest.fn().mockRejectedValue();

const clientId = 8771;

let hook;

const renderHookAndCallRequest = async getMock => {
    jest.clearAllMocks();

    axios.get = getMock;

    hook = renderHook(() => useClientDetails());
    const { getClientById } = hook.result.current;
    await getClientById(clientId);
};

describe('Teste unitário - useClientDetails', () => {
    describe('quando o hook é chamado com sucesso', () => {
        beforeEach(async () => {
            await renderHookAndCallRequest(mockGetAxiosSuccess);
        });

        it('faz a chamada da url correta', () => {
            expect(mockGetAxiosSuccess).toHaveBeenCalledTimes(1);
            expect(mockGetAxiosSuccess).toHaveBeenCalledWith(`/bff/private/v1/back-office/client/${clientId}`);
        });

        it('retorna os dados trazidos pela requisição no estado do hook', () => {
            expect(hook.result.current.client).toEqual(responseMockApi.data);
        });

    });

    describe('quando o hook é chamado com erro', () => {
        it('aciona o error helper que retorna o feedback para o usuário', async () => {
            await renderHookAndCallRequest(mockGetAxiosFail);

            expect(extractRequestError).toHaveBeenCalledTimes(1);
        });
    });
});
