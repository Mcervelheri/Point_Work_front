import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';
import { messageSuccess } from '../helpers/toast';

import useEditClientVip from '../use-edit-client-vip';

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

const putMock = jest.fn();
const onSuccessMock = jest.fn();

const mockApiSuccess = () => {
    axios.put = putMock.mockResolvedValue({
        status: 200,
    });
};

const mockApiError = () => {
    axios.put = putMock.mockRejectedValue();
};

const renderEditClientVip = () => {
    return renderHook(() => useEditClientVip(onSuccessMock));
};

const renderHookWithSuccess = () => {
    mockApiSuccess();
    return renderEditClientVip();
};

const renderHookWithError = () => {
    mockApiError();
    return renderEditClientVip();
};

describe('useEditClientVip | Teste Unitário', () => {
    describe('quando ocorre sucesso na requisição para editar um cliente vip', () => {
        let hook;

        beforeEach(() => {
            hook = renderHookWithSuccess();

            hook.result.current.requestEditClientVip('12312312312', 'Naruto', '123');
        });

        it('a requisição é chamada com a URL correta', async () => {
            await hook.waitFor(() => {
                expect(putMock).toBeCalledWith(
                    '/bff/private/back-office/onboarding-allowlist/123',
                    { name: 'Naruto', nationalRegistration: '12312312312' },
                );
            });
        });

        it('chama o messageSuccess que irá dar feedback para o usuário', () => {
            expect(messageSuccess).toHaveBeenCalledWith('Cadastro alterado com sucesso!');
        });
    });

    describe('quando ocorre um erro na requisição', () => {
        let hook;

        beforeEach(() => {
            hook = renderHookWithError();

            hook.result.current.requestEditClientVip('12312312312', 'Naruto', '123');
        });

        it('a função extractRequestError é chamada', async () => {
            await hook.waitFor(() => {
                expect(extractRequestError).toHaveBeenCalled();
            });
        });
    });
});
