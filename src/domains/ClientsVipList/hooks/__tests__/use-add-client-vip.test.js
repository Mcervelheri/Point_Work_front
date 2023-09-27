import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';
import { messageSuccess } from '../helpers/toast';

import useAddClientVip from '../use-add-client-vip';

jest.mock('../../../../helpers/error-helper', () => ({
    extractRequestError: jest.fn(),
}));

jest.mock('../../../../hooks/use-async', () => {
    return jest.fn(cb => ({
        loading: false,
        call: cb,
    }));
});

jest.mock('../../../../helpers/toast', () => ({
    messageSuccess: jest.fn(),
}));

const postMock = jest.fn();
const onSuccessMock = jest.fn();

const mockApiSuccess = () => {
    axios.post = postMock.mockResolvedValue({
        status: 200,
    });
};

const mockApiError = () => {
    axios.post = postMock.mockRejectedValue();
};

const renderAddClientVip = () => {
    return renderHook(() => useAddClientVip(onSuccessMock));
};

const renderHookWithSuccess = () => {
    mockApiSuccess();
    return renderAddClientVip();
};

const renderHookWithError = () => {
    mockApiError();
    return renderAddClientVip();
};

describe('useAddClientVip | Teste Unitário', () => {
    describe('quando ocorre sucesso na requisição para adicionar um novo cliente vip', () => {
        let hook;

        beforeEach(() => {
            hook = renderHookWithSuccess();

            hook.result.current.requestAddClientVip('naruto', '12312312390');
        });

        it('a requisição é chamada com a URL correta', async () => {
            await hook.waitFor(() => {
                expect(postMock).toBeCalledWith('/bff/private/back-office/onboarding-allowlist', {
                    name: 'naruto',
                    nationalRegistration: '12312312390',
                });
            });
        });

        it('chama o callback de sucesso', async () => {
            await hook.waitFor(() => {
                expect(onSuccessMock).toHaveBeenCalled();
            });
        });

        it('chama o messageSuccess que irá dar feedback para o usuário', () => {
            expect(messageSuccess).toHaveBeenCalledWith('Cliente adicionado com sucesso!');
        });
    });

    describe('quando ocorre um erro na requisição', () => {
        let hook;

        beforeEach(() => {
            hook = renderHookWithError();

            hook.result.current.requestAddClientVip('naruto', '12312312390');
        });

        it('a função extractRequestError é chamada', async () => {
            await hook.waitFor(() => {
                expect(extractRequestError).toHaveBeenCalled();
            });
        });
    });
});
