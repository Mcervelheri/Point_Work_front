import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';

import useDataFileExportStatus from '../use-data-file-export-status';

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

const URL_FILE_EXPORT_STATUS = '/bff/private/v1/back-office/data-dock/exports';
const MOCK_FILE_EXPORT_STATUS = [
    {
        extractionType: 'PLD',
        status: 'FINISHED',
        link: 'http://www.google.com.br',
        services: [
            {
                name: 'PIX_TRANSFERS',
                createdAt: '2022-09-16T03:00:000Z',
                updatedAt: '2022-09-16T06:00:000Z',
                ticket: '30731fd0-0ddd-4e0b-a7a4-24f8aeece1b7',
                status: 'FINISHED',
            },
            {
                name: 'PAYMENTS',
                createdAt: '2022-09-16T03:00:000Z',
                updatedAt: '2022-09-16T06:00:000Z',
                ticket: '30731fd0-0ddd-4e0b-a7a4-24f8aeece1b7',
                status: 'FINISHED',
            },
        ],
    },
];

const mockApiSuccess = () => {
    axios.get = getMock.mockResolvedValue({
        data: MOCK_FILE_EXPORT_STATUS,
    });
};

const mockApiError = () => {
    axios.get = getMock.mockRejectedValue({
        data: null,
    });
};

const renderDataFileExportStatus = () => {
    return renderHook(() => useDataFileExportStatus());
};

const renderHookWithSuccess = () => {
    mockApiSuccess();
    return renderDataFileExportStatus();
};

const renderHookWithError = () => {
    mockApiError();
    return renderDataFileExportStatus();
};

describe('useDataFileExportStatus | Teste Unitário', () => {
    describe('Quando ocorre sucesso na requisição dos status de exportação', () => {
        let hook;

        beforeEach(() => {
            hook = renderHookWithSuccess();
        });

        it('a requisição é chamada com a URL correta e sem a data de referência no parâmetro da query', async () => {
            hook.result.current.requestDataFileExportStatus();

            await hook.waitForNextUpdate();

            expect(getMock).toBeCalledWith(URL_FILE_EXPORT_STATUS, { params: { referenceDate: undefined } });
        });

        it('a requisição é chamada com a URL correta e a data de referência no parâmetro da query', async () => {
            hook.result.current.requestDataFileExportStatus('2022-09-26');

            await hook.waitForNextUpdate();

            expect(getMock).toBeCalledWith(URL_FILE_EXPORT_STATUS, { params: { referenceDate: '2022-09-26' } });
        });

        it('retorna a lista com os informações dos status das exportações', async () => {
            hook.result.current.requestDataFileExportStatus();

            await hook.waitForNextUpdate();

            expect(hook.result.current.servicesExportStatusList).toBe(MOCK_FILE_EXPORT_STATUS);
        });
    });

    describe('Quando ocorre um erro na requisição', () => {
        let hook;

        beforeEach(async () => {
            hook = renderHookWithError();

            hook.result.current.requestDataFileExportStatus();

            await hook.waitForNextUpdate();
        });

        it('a função extractRequestError é chamada', () => {
            expect(extractRequestError).toHaveBeenCalled();
        });

        it('o valor da propriedade servicesExportStatusList é um array vazio', () => {
            expect(hook.result.current.servicesExportStatusList).toEqual([]);
        });
    });
});
