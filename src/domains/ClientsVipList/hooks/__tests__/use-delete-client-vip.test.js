import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';
import { messageSuccess } from '../helpers/toast';

import useDeleteClientVip from '../use-delete-client-vip';

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

const renderDeleteClientVip = () => {
    return renderHook(() => useDeleteClientVip(onSuccessMock));
};

const renderHookWithSuccess = () => {
    mockApiSuccess();
    return renderDeleteClientVip();
};

const renderHookWithError = () => {
    mockApiError();
    return renderDeleteClientVip();
};

describe('useDeleteClientVip | Teste Unitário', () => {
    describe('quando ocorre sucesso na requisição para deletar cliente vip', () => {
        let hook;

        beforeEach(() => {
            hook = renderHookWithSuccess();

            hook.result.current.requestDeleteClientVip('123');
        });

        it('a requisição é chamada com a URL correta', () => {
            expect(postMock).toBeCalledWith('/bff/private/back-office/onboarding-allowlist/delete', {
                ids: ['123'],
            });
        });

        it('chama o callback de sucesso', async () => {
            await hook.waitFor(() => {
                expect(onSuccessMock).toHaveBeenCalled();
            });
        });

        it('chama o messageSuccess que irá dar feedback para o usuário', () => {
            expect(messageSuccess).toHaveBeenCalledWith('Cliente deletado com sucesso!');
        });
    });

    describe('quando ocorre um erro na requisição', () => {
        let hook;

        beforeEach(() => {
            hook = renderHookWithError();

            hook.result.current.requestDeleteClientVip('123');
        });

        it('a função extractRequestError é chamada', async () => {
            await hook.waitFor(() => {
                expect(extractRequestError).toHaveBeenCalled();
            });
        });
    });
});
