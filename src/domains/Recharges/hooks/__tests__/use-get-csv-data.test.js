import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';
import { downloadFile } from '../helpers/file-helper';

import useGetCsvData from '../use-get-csv-data';

jest.mock('../../../../hooks/use-async', () => {
    return jest.fn(cb => ({
        loading: false,
        call: cb,
    }));
});

jest.mock('../../../../helpers/file-helper', () => ({
    downloadFile: jest.fn(),
}));

jest.mock('../../../../helpers/error-helper', () => ({
    extractRequestError: jest.fn(),
}));

const getMock = jest.fn();

const URL_PHONE_CSV = '/bff/private/v1/back-office/phone/recharges/reports/csv';

const MOCK_SUCESS_RESPONSE_DATA = `
id,codigo_pdv,id_operadora,valor,telefone,conta,data_recarga,status
8b5ffe32-acb7-4464-a3e5-63df448879e7,1020,1,10,11948252366,3233,2022-03-17T20:15:12.113Z,[]
080622db-8334-467a-bf3e-25922ce3b47a,1020,1,10,11948252366,3233,2022-03-17T20:15:15.714Z,[]
`;

const MOCK_QUERIES = {
    page: '1',
    sort: 'ASC',
    status: null,
    phone: '99999999999',
    endDate: '2022-12-28',
    startDate: '2022-11-28',
};

const mockApiSuccess = () => {
    axios.get = getMock.mockResolvedValue({
        headers: {
            'content-type': 'text/csv',
        },
        data: MOCK_SUCESS_RESPONSE_DATA,
    });
};

const mockApiError = () => {
    axios.get = getMock.mockRejectedValue({
        data: null,
    });
};

const renderPhoneRecharge = () => {
    return renderHook(() => useGetCsvData(MOCK_QUERIES));
};

const hookWithSuccess = () => {
    mockApiSuccess();
    return renderPhoneRecharge();
};

const hookWithError = () => {
    mockApiError();
    return renderPhoneRecharge();
};

describe('Teste Unitário - useGetCsvData', () => {
    describe('Quando ocorre sucesso na requisição', () => {
        let hook;

        beforeEach(() => {
            hook = hookWithSuccess();
            hook.result.current.requestCSVData();
        });

        it('a requisição é chamada com a URL correta', async () => {
            await waitFor(() => {
                expect(getMock).toBeCalledWith(URL_PHONE_CSV, {
                    params: {
                        page: MOCK_QUERIES.page,
                        status: MOCK_QUERIES.status,
                        endDate: MOCK_QUERIES.endDate,
                        sort: MOCK_QUERIES.sort,
                        startDate: MOCK_QUERIES.startDate,
                        phoneNumber: MOCK_QUERIES.phone,
                    },
                    data: null,
                    headers: {
                        'Content-Type': 'text/csv',
                    },
                    responseType: 'blob',
                });
            });

        });

        it('a função \'downloadFile\', que faz o download do arquivo, é chamada com os parâmetros corretos',
            async () => {
                await waitFor(() => {
                    expect(downloadFile).toBeCalledWith({
                        filename: 'relatorio-de-recargas.csv',
                        contentType: 'text/csv',
                        content: MOCK_SUCESS_RESPONSE_DATA,
                    });
                });

            });
    });

    describe('Quando ocorre um erro na requisição', () => {
        let hook;

        beforeEach(() => {
            hook = hookWithError();
            hook.result.current.requestCSVData();
        });

        it('a função extractRequestError é chamada', async () => {
            await waitFor(() => {
                expect(extractRequestError).toHaveBeenCalled();
            });
        });
    });
});
