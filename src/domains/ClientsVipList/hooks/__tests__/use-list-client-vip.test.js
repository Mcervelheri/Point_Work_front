import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';

import useListClientVip from '../use-list-client-vip';

const MOCK_DATA = {};

const MOCK_REQUEST_PARAMS = {
    name: 'naruto',
    nationalRegistration: '12312312345',
    totalItemsPerPage: 10,
    order: 'name',
    orderBy: 'desc',
    currentPage: 1,
};

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

const mockApiSuccess = () => {
    axios.get = getMock.mockResolvedValue({
        status: 200,
        data: MOCK_DATA,
    });
};

const mockApiError = () => {
    axios.get = getMock.mockRejectedValue();
};

const renderListClientVip = () => {
    return renderHook(() => useListClientVip());
};

const renderHookWithSuccess = () => {
    mockApiSuccess();
    return renderListClientVip();
};

const renderHookWithError = () => {
    mockApiError();
    return renderListClientVip();
};

describe('useListClientVip | Teste Unitário', () => {
    describe('quando ocorre sucesso na requisição para listar os cliente vip', () => {
        let hook;

        beforeEach(() => {
            hook = renderHookWithSuccess();
        });

        it('a requisição é chamada com a URL correta', async () => {
            hook.result.current.clientsVipRequest(MOCK_REQUEST_PARAMS);

            await hook.waitForNextUpdate();

            expect(getMock).toBeCalledWith('/bff/private/back-office/onboarding-allowlist', {
                params: {
                    limit: 10,
                    name: 'naruto',
                    nationalRegistration: '12312312345',
                    page: 1,
                    sortField: 'name',
                    sortOrientation: 'desc',
                },
            });
        });
    });

    describe('Quando ocorre um erro na requisição', () => {
        let hook;

        beforeEach(() => {
            hook = renderHookWithError();
        });

        it('a função extractRequestError é chamada', async () => {
            hook.result.current.clientsVipRequest(MOCK_REQUEST_PARAMS);

            await hook.waitFor(() => {
                expect(extractRequestError).toHaveBeenCalled();
            });
        });
    });
});
