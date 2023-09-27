import { renderHook } from '@testing-library/react-hooks';

import { extractRequestError } from '../helpers/error-helper';

import useAccountDetails from '../useAccountDetails';
import useClientDetails from '../useClientDetails';
import usePhysicalPersonData from '../usePhysicalPersonData';

jest.mock('../../../../hooks/use-async', () => {
    return jest.fn(callback => ({
        loading: false,
        call: callback,
    }));
});

jest.mock('../../../../helpers/error-helper', () => ({
    extractRequestError: jest.fn(),
}));

jest.mock('../useAccountDetails.js');
jest.mock('../useClientDetails.js');

const mockAccountId = 2000;

let hook;

const renderHookAndCallRequest = async () => {
    jest.clearAllMocks();

    hook = renderHook(() => usePhysicalPersonData(mockAccountId));
    const { getPersonData } = hook.result.current;
    await getPersonData();
};

describe('Teste unitário - usePhysicalPersonData', () => {
    describe('quando o hook é chamado com sucesso', () => {
        const getAccountMock = jest.fn().mockReturnValue({ clientId: 12 });
        const getClientMock = jest.fn();
        const accountMock = 'test account';
        const clientMock = 'test client';

        beforeEach(async () => {
            jest.clearAllMocks();

            useAccountDetails.mockReturnValue({
                getAccountById: getAccountMock,
                account: accountMock,
                loadingAccount: false,
            });

            useClientDetails.mockReturnValue({
                getClientById: getClientMock,
                client: clientMock,
                loadingAccount: false,
            });

            await renderHookAndCallRequest();
        });

        it('aciona o hook useAccountDetails', () => {
            expect(useAccountDetails).toHaveBeenCalledTimes(1);
            expect(useAccountDetails).toHaveBeenCalledWith(mockAccountId);
        });

        it('aciona o hook useClientDetails', () => {
            expect(useClientDetails).toHaveBeenCalledTimes(1);
        });

        it('chama a função getAccountMock', () => {
            expect(getAccountMock).toHaveBeenCalledTimes(1);
        });

        it('chama a função getClientMock com o clientId pego na getAccountMock', () => {
            expect(getClientMock).toHaveBeenCalledTimes(1);
            expect(getClientMock).toHaveBeenCalledWith(12);
        });

        it('retorna o account retornado pelo useAccountDetails', () => {
            expect(hook.result.current.account).toEqual(accountMock);
        });

        it('retorna o client retornado pelo useClientDetails', () => {
            expect(hook.result.current.client).toEqual(clientMock);
        });
    });

    describe('quando o hook é chamado com erro', () => {
        it('aciona o error helper que retorna o feedback para o usuário', async () => {
            useAccountDetails.mockReturnValue({
                getAccountById: () => { throw Error; },
            });

            await renderHookAndCallRequest();

            expect(extractRequestError).toHaveBeenCalledTimes(1);
        });
    });
});
